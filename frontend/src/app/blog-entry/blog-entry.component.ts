import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

enum MediaType {
  PDF = 0,
  Image = 1,
  Video = 2
}

@Component({
    selector: 'app-upload',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './blog-entry.component.html',
    styleUrls: ['./blog-entry.component.scss']
  })
  export class BlogEntryComponent {
    blog = { title : '' };
    MediaType = MediaType;
    mediaType: MediaType = MediaType.PDF;
    thumbnailFile: File | null = null;
    contentFile: File | null = null;
    description = '';
    thumbnailTouched = false;
    contentTouched = false;

    onThumbnailChange(event: any) {
      this.thumbnailFile = event.target.files[0];
      this.thumbnailTouched = true;
    }
  
    onContentFileChange(event: any) {
      this.contentFile = event.target.files[0];
      this.contentTouched = true;
    }

    uploadBlog() {
    }

    
  }