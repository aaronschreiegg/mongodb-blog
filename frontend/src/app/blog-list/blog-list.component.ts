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
  queries = ["Query 1", "Query 2", "Query 3", "Query 4", "Query 5"];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadBlogEntries();  // Load blog entries when component initializes
  }

  toggleView() {
    this.showCards = !this.showCards;
    localStorage.setItem('showCards', JSON.stringify(this.showCards));
  }

  loadBlogEntries() {
    this.http.get<BlogEntry[]>('http://localhost:5000/blogs').subscribe({
      next: (response) => {
        console.log('Loaded entries:', response);
        this.blogEntries = response;
        this.filteredBlogEntries = response;
      },
      error: (error) => {
        console.error('Error loading entries:', error);
      }
    });
  }

  clickEntry(blogEntry: BlogEntry) {
    this.router.navigate(['/blog', blogEntry._id]);
  }

  goToUpload() {
    this.router.navigate(['/upload']);
  }

  executeQuery() {
    if (this.selectedQuery) {
      console.log("Ausgewählte Query:", this.selectedQuery);
      switch (this.selectedQuery) {
        case "Query 1":
          this.filteredBlogEntries = this.blogEntries.filter(entry => entry.title.includes('Blog'));
          break;
        case "Query 2":
          this.filteredBlogEntries = this.blogEntries.filter(entry => entry.author && entry.author.length > 0);
          break;
        case "Query 3":
          this.filteredBlogEntries = this.blogEntries.filter(entry => entry.description && entry.description.length > 10);
          break;
        case "Query 4":
          this.filteredBlogEntries = [...this.blogEntries].sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "Query 5":
          this.filteredBlogEntries = this.blogEntries.slice(0, 5);
          break;
        default:
          this.filteredBlogEntries = this.blogEntries;
          break;
      }
    }
  }

  getFilteredEntries() {
    return this.filteredBlogEntries.length > 0 ? this.filteredBlogEntries : this.blogEntries;
  }
}
