import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface BlogEntry {
  id: number;
  title: string;
  author_ids: number[];
  description: string;
  content_text: string;
}

interface Comment {
  username: string;
  text: string;
  imageUrls?: string[];
}

@Component({
  selector: 'app-blog-screen',
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-screen.component.html',
  styleUrls: ['./blog-screen.component.scss']
})
export class BlogScreenComponent {
  selectedBlogEntry: BlogEntry | undefined;
  comments: Comment[] = [];
  newComment: Comment = { username: '', text: '', imageUrls: [] };

  @ViewChild('fileInput') fileInput!: ElementRef;

  blogEntries: BlogEntry[] = [
    { id: 1, title: 'Erster Artikel', author_ids: [101, 102, 103], description: "Lorem ipsum dolor sit amet...", content_text: 'Lorem ipsum dolor sit amet...' },
    { id: 2, title: 'Zweiter Artikel', author_ids: [102], description: "Beschreibung 2", content_text: 'Hier steht ein weiterer ausführlicher Inhalt...' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.selectedBlogEntry = this.blogEntries.find(entry => entry.id === id);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  addComment() {
    if (this.newComment.username && this.newComment.text) {
      this.comments.push({ ...this.newComment });
      this.newComment = { username: '', text: '', imageUrls: [] };
      this.resetFileInput();
    }
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      Array.from(files).forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (this.newComment.imageUrls) {
            this.newComment.imageUrls.push(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number) {
    if (this.newComment.imageUrls) {
      this.newComment.imageUrls.splice(index, 1);
    }
    if (this.newComment.imageUrls!.length === 0) {
      this.resetFileInput();
    }
  }

  resetFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
