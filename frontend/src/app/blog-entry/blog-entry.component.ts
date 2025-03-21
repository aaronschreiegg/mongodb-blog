import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  
    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

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
                this.compressAndConvertImage(file);
            } else {
                this.contentFile = file;
                // Wenn es eine PDF oder Video ist, speichern wir den Dateinamen als content
                this.blog.content = file.name;
            }
        }
    }

    compressAndConvertImage(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result as string;
            
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d')!;
                
                // Maximale Dimensionen
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 600;
                
                let width = img.width;
                let height = img.height;
                
                // Berechne neue Dimensionen unter Beibehaltung des Seitenverhältnisses
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                
                // Zeichne das Bild mit den neuen Dimensionen
                ctx.drawImage(img, 0, 0, width, height);
                
                // Konvertiere zu Base64 mit reduzierter Qualität
                const compressedImage = canvas.toDataURL('image/jpeg', 0.7);
                this.blog.images.push(compressedImage);
                // Bei Bildern setzen wir den Dateinamen als content
                this.blog.content = file.name;
            };
        };
    }

    uploadBlog() {
        if (!this.blog.content) {
            console.error('Kein Inhalt ausgewählt');
            return;
        }

        // Bereite die Daten für das Backend vor
        const blogData = {
            title: this.blog.title,
            author: this.blog.author,
            description: this.blog.description,
            content: this.blog.content, // Dies wird als content_text im Backend verwendet
            commentsAllowed: this.blog.commentsAllowed,
            images: this.blog.images
        };

        // Sende die Daten an das Backend
        this.http.post('http://localhost:4000/blogs', blogData).subscribe({
            next: (response: any) => {
                console.log('Blog erfolgreich erstellt:', response);
                this.router.navigate(['/']); // Zurück zur Blog-Liste
            },
            error: (error) => {
                console.error('Fehler beim Erstellen des Blogs:', error);
                alert('Fehler beim Erstellen des Blogs: ' + error.message);
            }
        });
    }

    goBack() {
        this.router.navigate(['/']);
    }
}
