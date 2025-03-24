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
  users: { _id: string, username: string }[] = [];
  selectedUserId: string = '';

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
      this.loadUsers();
    }

    console.log(this.selectedBlogEntry?.content_images)
  }

  loadUsers() {
    this.http.get<{ _id: string, username: string }[]>('http://localhost:5000/users').subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        console.error("Fehler beim Laden der Benutzer:", error);
      }
    });
  }

  loadBlogEntry(id: string) {
    this.http.get<BlogEntry>(`http://localhost:5000/blogs/${id}`).subscribe({
      next: (response) => {
        // Falls nur base64 gespeichert ist, Prefix hinzufügen
        if (response.content_images && response.content_images.length > 0) {
          response.content_images = response.content_images.map(image => {
            // Nur Prefix hinzufügen, wenn nicht schon vorhanden
            if (!image.startsWith('data:image')) {
              return `data:image/png;base64,${image}`; // oder image/jpeg je nach Format
            }
            return image;
          });
        }

        this.selectedBlogEntry = response;
      },
      error: (error) => {
        console.error("Error loading blog entry:", error);
        this.router.navigate(['/']);
      }
    });
  }



  loadComments(blogId: string) {
    this.http.get<{status: number, data: Comment[]}>(`http://localhost:5000/comments/${blogId}`).subscribe({
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

  getAuthorNameString(): string {
    if (this.selectedBlogEntry == undefined){
      return "";
    }
    return this.selectedBlogEntry!.author_ids
      .map(a => a.username)
      .join(', ');
  }

  submitComment() {
    if (!this.selectedBlogEntry || !this.newComment.trim() || !this.selectedUserId) return;

    const commentData = {
      blog_entry_id: this.selectedBlogEntry._id,
      user_id: this.selectedUserId,
      content_text: this.newComment.trim()
    };

    this.http.post<{ status: number, data: Comment }>('http://localhost:5000/comments', commentData).subscribe({
      next: (response) => {
        if (response.status === 201) {
          this.comments.push(response.data);
          this.newComment = '';
          this.loadComments(this.selectedBlogEntry?._id!);
        }
      },
      error: (error) => {
        console.error('Fehler beim Posten des Kommentars:', error);
        alert('Fehler beim Posten des Kommentars');
      }
    });
  }


  getUsername(comment: Comment): string {
    return comment.user_id && typeof comment.user_id === 'object' && comment.user_id.username
      ? comment.user_id.username
      : 'Unbekannter Nutzer';
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
