import { Component, OnInit } from '@angular/core';
import { BlogEntry } from '../models/blog-entry.model';
import { Comment } from '../models/comment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-screen.component.html',
  styleUrl: './blog-screen.component.scss'
})
export class BlogScreenComponent implements OnInit {
  selectedBlogEntry: BlogEntry | undefined;
  comments: Comment[] = [];
  newComment: string = '';
  currentUser: string = 'Anonymous'; // In einer echten App würde dies aus dem Auth-Service kommen

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBlogEntry(id);
      this.loadComments(id);
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
        this.router.navigate(['/']);
      }
    });
  }

  loadComments(blogId: string) {
    this.http.get<any>(`http://localhost:4000/comments/${blogId}`).subscribe({
      next: (response) => {
        if (response.status === 200 && response.data) {
          this.comments = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading comments:', error);
      }
    });
  }

  submitComment() {
    if (!this.selectedBlogEntry || !this.newComment.trim()) return;

    const commentData = {
      blog_entry_id: this.selectedBlogEntry._id,
      user_id: this.currentUser,
      content_text: this.newComment.trim()
    };

    this.http.post<{status: number, data: any}>('http://localhost:4000/comments', commentData).subscribe({
      next: (response) => {
        if (response.status === 201) {
          this.newComment = '';
          this.loadComments(this.selectedBlogEntry!._id!);
        }
      },
      error: (error) => {
        console.error('Error posting comment:', error);
        alert('Fehler beim Posten des Kommentars');
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
