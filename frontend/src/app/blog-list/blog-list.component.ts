import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BlogEntry } from '../models/blog-entry.model';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
  showSidebar = false;
  showCards = false;
  selectedQuery: string = '';
  blogEntries: BlogEntry[] = [];
  filteredBlogEntries: BlogEntry[] = [];
  queries = [
    "Alle Blog-Einträge",
    "Neueste zuerst", 
    "Älteste zuerst",
    "Mehr als 0 Aufrufe",
    "Mit Bildern", 
    "Sortiert nach Titel",
    "Ohne Beschreibung",
    "Neueste 2 Einträge"
  ];
  isLoading = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const savedView = localStorage.getItem('showCards');
    this.showCards = savedView ? JSON.parse(savedView) : false;
    this.loadBlogEntries();  // Load blog entries when component initializes
  }

  toggleView() {
    this.showCards = !this.showCards;
    localStorage.setItem('showCards', JSON.stringify(this.showCards));
  }

  loadBlogEntries() {
    this.isLoading = true;
    this.http.get<BlogEntry[]>('http://localhost:5000/blogs').subscribe({
      next: (response) => {
        console.log('Loaded entries:', response);
        this.blogEntries = response;
        this.filteredBlogEntries = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading entries:', error);
        this.isLoading = false;
      }
    });
  }

  deleteBlogEntry(entry: BlogEntry) {
    if (!confirm(`Möchtest du den Blogeintrag "${entry.title}" wirklich löschen?`)) return;

    this.http.delete(`http://localhost:5000/blogs/${entry._id}`).subscribe({
      next: () => {
        this.blogEntries = this.blogEntries.filter(b => b._id !== entry._id);
        this.filteredBlogEntries = this.filteredBlogEntries.filter(b => b._id !== entry._id);
        alert("Blogeintrag wurde gelöscht.");
      },
      error: (err) => {
        console.error("Fehler beim Löschen:", err);
        alert("Fehler beim Löschen.");
      }
    });
  }

  editBlogEntry(entry: BlogEntry) {
    this.router.navigate(['/upload', entry._id]);
  }

  clickEntry(blogEntry: BlogEntry) {
    this.http.put(`http://localhost:5000/blogs/impression/${blogEntry._id}`, {}).subscribe({
      next: () => {
        this.router.navigate(['/blog', blogEntry._id]);
      },
      error: (err) => {
        console.error("Fehler beim Hochzählen der Impression:", err);
        // Optional trotzdem navigieren:
        this.router.navigate(['/blog', blogEntry._id]);
      }
    });
  }

  goToUpload() {
    this.router.navigate(['/upload']);
  }

  navigateToCategories() {
    this.router.navigate(['/categories']);
  }

  getAuthorNameString(currentEntry: BlogEntry): string {
    return currentEntry.author_ids
      .map(a => a.username)
      .join(', ');
  }

  executeQuery() {
    if (!this.selectedQuery) {
      this.filteredBlogEntries = this.blogEntries;
      return;
    }

    this.isLoading = true;
    
    // Für einige Queries können wir clientseitige Filter verwenden
    switch (this.selectedQuery) {
      case "Alle Blog-Einträge":
        this.filteredBlogEntries = this.blogEntries;
        this.isLoading = false;
        break;
        
      case "Neueste zuerst":
        // Sortiert nach Erstellungsdatum absteigend (neueste zuerst)
        this.filteredBlogEntries = [...this.blogEntries].sort((a, b) => 
          new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
        );
        this.isLoading = false;
        break;
        
      case "Älteste zuerst":
        // Sortiert nach Erstellungsdatum aufsteigend (älteste zuerst)
        this.filteredBlogEntries = [...this.blogEntries].sort((a, b) => 
          new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
        );
        this.isLoading = false;
        break;

      case "Mehr als 0 Aufrufe":
        // Filtert Einträge mit Impressions > 0
        this.filteredBlogEntries = this.blogEntries.filter(entry => entry.impressionCount > 0);
        this.isLoading = false;
        break;
        
      case "Mit Bildern":
        // Filtert Einträge, die Bilder enthalten
        this.filteredBlogEntries = this.blogEntries.filter(entry => 
          entry.content_images && entry.content_images.length > 0
        );
        this.isLoading = false;
        break;
        
      case "Sortiert nach Titel":
        // Sortiert alphabetisch nach Titel
        this.filteredBlogEntries = [...this.blogEntries].sort((a, b) => 
          a.title.localeCompare(b.title)
        );
        this.isLoading = false;
        break;
        
      case "Ohne Beschreibung":
        // Filtert Einträge ohne Beschreibung
        this.filteredBlogEntries = this.blogEntries.filter(entry => 
          !entry.description || entry.description.trim() === ""
        );
        this.isLoading = false;
        break;
        
      case "Neueste 2 Einträge":
        // Holt die neuesten 2 Blog-Einträge
        this.filteredBlogEntries = [...this.blogEntries]
          .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
          .slice(0, 2);
        this.isLoading = false;
        break;
        
      default:
        this.filteredBlogEntries = this.blogEntries;
        this.isLoading = false;
        break;
    }
  }

  getFilteredEntries() {
    return this.filteredBlogEntries.length > 0 ? this.filteredBlogEntries : this.blogEntries;
  }
}
