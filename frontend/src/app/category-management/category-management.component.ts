import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.scss'
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  newCategoryName: string = '';
  editingCategory: Category | null = null;
  editingCategoryName: string = "";
  isLoading = false;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.http.get<Category[]>('http://localhost:5000/categories').subscribe({
      next: (response) => {
        this.categories = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Kategorien:', error);
        this.errorMessage = 'Kategorien konnten nicht geladen werden';
        this.isLoading = false;
      }
    });
  }

  addCategory() {
    if (!this.newCategoryName.trim()) {
      this.errorMessage = 'Bitte geben Sie einen Kategorienamen ein';
      return;
    }

    this.isLoading = true;
    this.http.post<Category>('http://localhost:5000/categories', { name: this.newCategoryName }).subscribe({
      next: (response) => {
        this.categories.push(response);
        this.newCategoryName = '';
        this.isLoading = false;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Fehler beim Erstellen der Kategorie:', error);
        this.errorMessage = 'Kategorie konnte nicht erstellt werden';
        this.isLoading = false;
      }
    });
  }

  startEditing(category: Category) {
    this.editingCategoryName = category.name;
    this.editingCategory = { ...category };
  }

  cancelEditing() {
    this.editingCategory = null;
  }

  updateCategory() {
    if (!this.editingCategory) return;
    if (!this.editingCategory.name.trim()) {
      this.errorMessage = 'Der Kategoriename darf nicht leer sein';
      return;
    }

    this.editingCategory.name = this.editingCategoryName;

    this.isLoading = true;
    this.http.put<Category>(
      `http://localhost:5000/categories/${this.editingCategory._id}`, 
      { name: this.editingCategory.name }
    ).subscribe({
      next: (updatedCategory) => {
        const index = this.categories.findIndex(c => c._id === updatedCategory._id);
        if (index !== -1) {
          this.categories[index] = updatedCategory;
        }
        this.editingCategory = null;
        this.isLoading = false;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Fehler beim Aktualisieren der Kategorie:', error);
        this.errorMessage = 'Kategorie konnte nicht aktualisiert werden';
        this.isLoading = false;
      }
    });
  }

  deleteCategory(category: Category) {
    if (!confirm(`Möchten Sie die Kategorie "${category.name}" wirklich löschen?`)) return;

    this.isLoading = true;
    this.http.delete(`http://localhost:5000/categories/${category._id}`).subscribe({
      next: () => {
        this.categories = this.categories.filter(c => c._id !== category._id);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fehler beim Löschen der Kategorie:', error);
        this.errorMessage = 'Kategorie konnte nicht gelöscht werden';
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
} 