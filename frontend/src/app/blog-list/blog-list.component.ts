import { Component, signal } from '@angular/core';
import { BlogEntry } from '../models/blog-entry.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  showSidebar = false;
  selectedQuery: string = '';
  blogEntries = signal<BlogEntry[] | undefined>([]);
  queries = signal<string[]>([]);

  constructor(private router: Router) {}

  clickEntry(blogEntry: BlogEntry) {
    console.log("Clicked on blog entry: " + blogEntry.title);
    this.router.navigate(['/blog', blogEntry.id]);
  }

  goToUpload() {
    this.router.navigate(['/upload']);
  }

  executeQuery() {
    if (this.selectedQuery) {
      console.log("Ausgewählte Query:", this.selectedQuery);
      // Hier kannst du die Logik zum Ausführen der Query einfügen
    }
  }

  ngOnInit() {
    this.blogEntries.set([
      {
        id: 1,
        title: "Erster Blogeintrag",
        author_ids: [101, 102, 103],
        description: "Dies ist eine kurze Beschreibung des ersten Eintrags.",
        content_text: "Hier steht der Inhalt des ersten Blogeintrags."
      },
      {
        id: 2,
        title: "Zweiter Blogeintrag",
        author_ids: [102],
        description: "Ein weiterer Testeintrag mit einer kurzen Beschreibung.",
        content_text: "Dies ist der Inhalt des zweiten Blogeintrags."
      },
      {
        id: 3,
        title: "Dritter Blogeintrag",
        author_ids: [103],
        description: "Hier ist eine Beschreibung für den dritten Eintrag.",
        content_text: "Der dritte Blogeintrag enthält diesen Beispieltext."
      },
      {
        id: 4,
        title: "Vierter Blogeintrag",
        author_ids: [104],
        description: "Ein Blogeintrag zum Testen mit einer Beispielbeschreibung.",
        content_text: "Der vierte Eintrag enthält einige interessante Inhalte."
      },
      {
        id: 5,
        title: "Fünfter Blogeintrag",
        author_ids: [105],
        description: "Der letzte Testeintrag mit einer passenden Beschreibung.",
        content_text: "In diesem Blogeintrag gibt es ebenfalls relevanten Inhalt."
      },
      {
        id: 1,
        title: "Erster Blogeintrag",
        author_ids: [101],
        description: "Dies ist eine kurze Beschreibung des ersten Eintrags.",
        content_text: "Hier steht der Inhalt des ersten Blogeintrags."
      },
      {
        id: 2,
        title: "Zweiter Blogeintrag",
        author_ids: [102],
        description: "Ein weiterer Testeintrag mit einer kurzen Beschreibung.",
        content_text: "Dies ist der Inhalt des zweiten Blogeintrags."
      },
      {
        id: 3,
        title: "Dritter Blogeintrag",
        author_ids: [103],
        description: "Hier ist eine Beschreibung für den dritten Eintrag.",
        content_text: "Der dritte Blogeintrag enthält diesen Beispieltext."
      },
      {
        id: 4,
        title: "Vierter Blogeintrag",
        author_ids: [104],
        description: "Ein Blogeintrag zum Testen mit einer Beispielbeschreibung.",
        content_text: "Der vierte Eintrag enthält einige interessante Inhalte."
      },
      {
        id: 5,
        title: "Fünfter Blogeintrag",
        author_ids: [105],
        description: "Der letzte Testeintrag mit einer passenden Beschreibung.",
        content_text: "In diesem Blogeintrag gibt es ebenfalls relevanten Inhalt."
      },
      {
        id: 1,
        title: "Erster Blogeintrag",
        author_ids: [101],
        description: "Dies ist eine kurze Beschreibung des ersten Eintrags.",
        content_text: "Hier steht der Inhalt des ersten Blogeintrags."
      },
      {
        id: 2,
        title: "Zweiter Blogeintrag",
        author_ids: [102],
        description: "Ein weiterer Testeintrag mit einer kurzen Beschreibung.",
        content_text: "Dies ist der Inhalt des zweiten Blogeintrags."
      },
      {
        id: 3,
        title: "Dritter Blogeintrag",
        author_ids: [103],
        description: "Hier ist eine Beschreibung für den dritten Eintrag.",
        content_text: "Der dritte Blogeintrag enthält diesen Beispieltext."
      },
      {
        id: 4,
        title: "Vierter Blogeintrag",
        author_ids: [104],
        description: "Ein Blogeintrag zum Testen mit einer Beispielbeschreibung.",
        content_text: "Der vierte Eintrag enthält einige interessante Inhalte."
      },
      {
        id: 5,
        title: "Fünfter Blogeintrag",
        author_ids: [105],
        description: "Der letzte Testeintrag mit einer passenden Beschreibung.",
        content_text: "In diesem Blogeintrag gibt es ebenfalls relevanten Inhalt."
      }
    ]);
  
    this.queries.set(["Query 1", "Query 2", "Query 3", "Query 4","Query 5"]);
    }
}
