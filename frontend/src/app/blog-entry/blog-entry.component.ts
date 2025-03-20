import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

enum MediaType {
  PDF = 'PDF',
  Image = 'Image',
  Video = 'Video'
}

@Component({
    selector: 'app-upload',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './blog-entry.component.html',
    styleUrls: ['./blog-entry.component.scss']
})
export class BlogEntryComponent {
  
    constructor(private router: Router) {}

    MediaType = MediaType;
    mediaType: MediaType = MediaType.PDF;

    blog = {
        title: '',
        author: '',
        description: '',
        creationDate: new Date(),
        editDates: [] as Date[],
        impressionCount: 0,
        content: '',
        commentsAllowed: true,
        images: [] as string[]  // Base64-encoded images
    };

    contentFile: File | null = null;
    contentTouched = false;
    thumbnailTouched = false;

    onContentFileChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.contentTouched = true;
            if (this.mediaType === MediaType.Image) {
                this.convertImageToBase64(file);
            } else {
                this.contentFile = file;
            }
        }
    }

    convertImageToBase64(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                this.blog.images.push(reader.result); // Speichert als Base64
            }
        };
    }

    uploadBlog() {
        this.blog.creationDate = new Date();
        console.log("Blog hochgeladen:", this.blog);
    }

    goBack() {
        this.router.navigate(['/']);
    }
}
