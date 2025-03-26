import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BlogScreenComponent } from './blog-screen/blog-screen.component';
import { NgModule } from '@angular/core';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogEntryComponent } from './blog-entry/blog-entry.component';
import { CategoryManagementComponent } from './category-management/category-management.component';

export const routes: Routes = [
        { path: '', component: BlogListComponent },
        { path: 'blog/:id', component: BlogScreenComponent },
        { path: 'upload', component: BlogEntryComponent },
        { path: 'upload', component: BlogEntryComponent },
        { path: 'upload/:id', component: BlogEntryComponent }, // für Edit
        { path: 'categories', component: CategoryManagementComponent }, // Kategorie-Verwaltung
];
