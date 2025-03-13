import { Component } from '@angular/core';
import { BlogEntry } from '../models/blog-entry.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-screen',
  imports: [],
  templateUrl: './blog-screen.component.html',
  styleUrl: './blog-screen.component.scss'
})
export class BlogScreenComponent {
  selectedBlogEntry: BlogEntry | undefined;

  blogEntries: BlogEntry[] = [
    { id: 1, title: 'Erster Artikel', author_id: 101, description:"Beschreibung 1", content_text: 'Hier steht der komplette Artikelinhalt...' },
    { id: 2, title: 'Zweiter Artikel', author_id: 102, description:"Beschreibung 2", content_text: 'Hier steht ein weiterer ausführlicher Inhalt...' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.selectedBlogEntry = this.blogEntries.find(entry => entry.id === id);
  }
}
