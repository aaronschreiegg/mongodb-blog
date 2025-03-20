import { Component, signal } from '@angular/core';
import { BlogEntry } from '../models/blog-entry.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  showSidebar = false;
  selectedQuery: string = '';
  blogEntries = signal<BlogEntry[] | undefined>([]); // Signal for blog entries
  filteredBlogEntriesList = signal<BlogEntry[] | undefined>([]); // Filtered blog entries
  queries = signal<string[]>([]); // Available queries

  constructor(private router: Router) {}

  clickEntry(blogEntry: BlogEntry) {
    console.log("Clicked on blog entry: " + blogEntry.title);
    this.router.navigate(['/blog', blogEntry.id]);
  }

  goToUpload() {
    this.router.navigate(['/upload']);
  }

  executeQuery() {
    if (this.selectedQuery) {
      console.log("Ausgewählte Query:", this.selectedQuery);
      // Handle queries with appropriate filtering
      switch (this.selectedQuery) {
        case "Query 1":
          this.filteredBlogEntriesList.set(this.blogEntries()!.filter(entry => entry.title.includes('Blog')));
          break;
        case "Query 2":
          this.filteredBlogEntriesList.set(this.blogEntries()!.filter(entry => entry.author_ids.length > 0));
          break;
        case "Query 3":
          this.filteredBlogEntriesList.set(this.blogEntries()!.filter(entry => entry.description && entry.description.length > 10));
          break;
        case "Query 4":
          this.filteredBlogEntriesList.set(this.blogEntries()!.sort((a, b) => a.title.localeCompare(b.title)));
          break;
        case "Query 5":
          this.filteredBlogEntriesList.set(this.blogEntries()!.slice(0, 5));
          break;
        default:
          this.filteredBlogEntriesList.set(this.blogEntries());
          break;
      }
    }
  }

  // Get filtered blog entries or fall back to all blog entries
  filteredBlogEntries() {
    return this.filteredBlogEntriesList() && this.filteredBlogEntriesList()!.length > 0 ? this.filteredBlogEntriesList() : this.blogEntries() || [];
  }

  ngOnInit() {
    this.blogEntries.set([
      { id: 1, title: "Erster Blogeintrag", author_ids: [101], description: "Dies ist eine kurze Beschreibung des ersten Eintrags.", content_text: "Hier steht der Inhalt des ersten Blogeintrags." },
      { id: 2, title: "Zweiter Blogeintrag", author_ids: [102], description: "Ein weiterer Testeintrag mit einer kurzen Beschreibung.", content_text: "Dies ist der Inhalt des zweiten Blogeintrags." },
      { id: 3, title: "Dritter Blogeintrag", author_ids: [103], description: "Hier ist eine Beschreibung für den dritten Eintrag.", content_text: "Der dritte Blogeintrag enthält diesen Beispieltext." },
      { id: 4, title: "Vierter Blogeintrag", author_ids: [104], description: "Ein Blogeintrag zum Testen mit einer Beispielbeschreibung.", content_text: "Der vierte Eintrag enthält einige interessante Inhalte." },
      { id: 5, title: "Fünfter Blogeintrag", author_ids: [105], description: "Der letzte Testeintrag mit einer passenden Beschreibung.", content_text: "In diesem Blogeintrag gibt es ebenfalls relevanten Inhalt." }
    ]);
    this.queries.set(["Query 1", "Query 2", "Query 3", "Query 4", "Query 5"]);
  }
}
