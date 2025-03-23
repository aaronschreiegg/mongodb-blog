import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/categories.model';
import { BlogUser } from '../models/blog-user.model';
import { response } from 'express';

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
export class BlogEntryComponent implements OnInit {
  
    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    MediaType = MediaType;
    mediaType: MediaType = MediaType.PDF;
    categories: Category[] = [];
    selectedCategory: string = '';
    newCategoryName: string = '';
    showNewCategoryInput: boolean = false;
    users: BlogUser[] = [];

    blog = {
        title: '',
        authors: [],
        description: '',
        creationDate: new Date(),
        editDates: [] as Date[],
        impressionCount: 0,
        content: '',
        commentsAllowed: true,
        images: [] as string[],  // Base64-encoded images
        category_id: ''  // Neue Kategorie-ID
    };

    contentFile: File | null = null;
    contentTouched = false;
    thumbnailTouched = false;

    ngOnInit() {
        // Lade Kategorien beim Start
        this.loadCategories();
        this.loadBlogUsers();
    }

    loadBlogUsers() {
        this.http.get<any>('http://localhost:4000/users').subscribe({
            next: (response) => {
                if(response.status === 200 && response.data) {
                    this.users = response.data;
                }
            },
            error: (error) => {
                console.error("Fehler beim Laden der User:", error);
            }
        });
    }

    loadCategories() {
        this.http.get<any>('http://localhost:4000/categories').subscribe({
            next: (response) => {
                if (response.status === 200 && response.data) {
                    this.categories = response.data;
                }
            },
            error: (error) => {
                console.error('Fehler beim Laden der Kategorien:', error);
            }
        });
    }

    createNewCategory() {
        if (!this.newCategoryName.trim()) {
            alert('Bitte geben Sie einen Kategorienamen ein');
            return;
        }

        this.http.post('http://localhost:4000/categories', { name: this.newCategoryName.trim() }).subscribe({
            next: (response: any) => {
                if (response.status === 201) {
                    // Lade die Kategorien neu
                    this.loadCategories();
                    // Setze die neue Kategorie als ausgewählt
                    this.blog.category_id = response.data._id;
                    // Verstecke das Eingabefeld
                    this.showNewCategoryInput = false;
                    // Setze das Eingabefeld zurück
                    this.newCategoryName = '';
                }
            },
            error: (error) => {
                console.error('Fehler beim Erstellen der Kategorie:', error);
                alert('Fehler beim Erstellen der Kategorie: ' + error.error.message);
            }
        });
    }

    onContentFileChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.contentTouched = true;
            if (this.mediaType === MediaType.Image) {
                this.compressAndConvertImage(file);
            } else {
                this.contentFile = file;
                // Bei PDF oder Video fügen wir nur einen Zeilenumbruch ein
                this.blog.content += '\n\n';
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
                // Füge nur einen Zeilenumbruch ein
                this.blog.content += '\n\n';
            };
        };
    }

    uploadBlog() {
        if (!this.blog.content.trim()) {
            console.error('Kein Inhalt eingegeben');
            return;
        }

        if (!this.blog.category_id) {
            console.error('Keine Kategorie ausgewählt');
            return;
        }

        // Bereite die Daten für das Backend vor
        const blogData = {
            title: this.blog.title,
            author: this.blog.authors,
            description: this.blog.description,
            content: this.blog.content.trim(), // Entferne überflüssige Leerzeichen
            commentsAllowed: this.blog.commentsAllowed,
            images: this.blog.images,
            category_id: this.blog.category_id
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
