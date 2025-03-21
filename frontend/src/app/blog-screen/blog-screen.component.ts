import { Component, OnInit } from '@angular/core';
import { BlogEntry } from '../models/blog-entry.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-screen.component.html',
  styleUrl: './blog-screen.component.scss'
})
export class BlogScreenComponent implements OnInit {
  selectedBlogEntry: BlogEntry | undefined;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBlogEntry(id);
    }
  }

  loadBlogEntry(id: string) {
    this.http.get<any>(`http://localhost:4000/blogs/${id}`).subscribe({
      next: (response) => {
        if (response.status === 200 && response.data) {
          this.selectedBlogEntry = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading blog entry:', error);
        this.router.navigate(['/']); // Bei Fehler zurück zur Liste
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
