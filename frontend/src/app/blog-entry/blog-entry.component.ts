import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BlogUser } from '../models/author.model';
import { Category } from '../models/category.model';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

enum MediaType {
  PDF = 'PDF',
  Image = 'Image',
  Video = 'Video'
}

@Component({
    selector: 'app-upload',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './blog-entry.component.html',
    styleUrls: ['./blog-entry.component.scss']
})
export class BlogEntryComponent implements OnInit {

    constructor(private router: Router, private http: HttpClient) {}

    MediaType = MediaType;
    mediaType: MediaType = MediaType.Image;

    blog = {
        title: '',
        author_ids: [],
        description: '',
        creationDate: new Date(),
        editDates: [] as Date[],
        impressionCount: 0,
        content: '',
        commentsAllowed: true,
        images: [] as string[],  // Base64-encoded images
        category: ''
    };

    contentFile: File | null = null;
    contentTouched = false;
    thumbnailTouched = false;
    authors: BlogUser[] = [];  // Array von Autoren
    categories: Category[] = [];  // Array von Kategorien
    newCategory: string = '';

    ngOnInit() {
        // Autoren und Kategorien laden
        this.loadAuthors();
        this.loadCategories();
    }

    loadAuthors() {
        this.http.get<BlogUser[]>('http://localhost:5000/users').subscribe(data => {
            this.authors = data;
        }, error => {
            console.error("Fehler beim Abrufen der Benutzer:", error);
        });
    }
    
    loadCategories() {
        this.http.get<Category[]>('http://localhost:5000/categories').subscribe(data => {
            this.categories = data;
        }, error => {
            console.error("Fehler beim Aufrufen der Kategorien:", error);
        });
    }    

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
                    // Füge nur einen Zeilenumbruch ein
                    this.blog.content += '\n\n';
                };
            };
        }

    uploadCategory() {
        // Neue Kategorie erstellen, falls notwendig
        if (this.newCategory) {
            this.http.post('http://localhost:5000/categories', { name: this.newCategory }).subscribe(() => {
                this.loadCategories();  // Nach der Erstellung die Kategorien neu laden
                this.blog.category = this.newCategory;
                this.saveBlog();
            });
        } else {
            this.saveBlog();
        }
    }

    saveBlog() {
        if (!this.blog.content.trim()) {
            console.error('Kein Inhalt eingegeben');
            return;
        }

        if (!this.blog.category) {
            console.error('Keine Kategorie ausgewählt');
            return;
        }

        // Bereite die Daten für das Backend vor
        const blogData = {
            title: this.blog.title,
            author_ids: this.blog.author_ids,  
            description: this.blog.description,
            content_text: this.blog.content.trim(), 
            commentsAllowed: this.blog.commentsAllowed,
            content_images: this.blog.images,  
            category_id: this.blog.category
        };
        

        // Sende die Daten an das Backend
        this.http.post('http://localhost:5000/blogs', blogData).subscribe({
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
