import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BlogScreenComponent } from './blog-screen/blog-screen.component';
import { NgModule } from '@angular/core';
import { BlogListComponent } from './blog-list/blog-list.component';

export const routes: Routes = [
        { path: '', component: BlogListComponent },
        { path: 'blog/:id', component: BlogScreenComponent }
];
