import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogEntry } from './models/blog-entry.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  blogEntries = signal<BlogEntry[] | undefined>([]);
  
  ngOnInit() {
    this.blogEntries.set([
      {
          id: 1,
          title: "Erster Blogeintrag",
          author_id: 101,
          description: "Dies ist eine kurze Beschreibung des ersten Eintrags.",
          content_text: "Hier steht der Inhalt des ersten Blogeintrags."
      },
      {
          id: 2,
          title: "Zweiter Blogeintrag",
          author_id: 102,
          description: "Ein weiterer Testeintrag mit einer kurzen Beschreibung.",
          content_text: "Dies ist der Inhalt des zweiten Blogeintrags."
      },
      {
          id: 3,
          title: "Dritter Blogeintrag",
          author_id: 103,
          description: "Hier ist eine Beschreibung für den dritten Eintrag.",
          content_text: "Der dritte Blogeintrag enthält diesen Beispieltext."
      },
      {
          id: 4,
          title: "Vierter Blogeintrag",
          author_id: 104,
          description: "Ein Blogeintrag zum Testen mit einer Beispielbeschreibung.",
          content_text: "Der vierte Eintrag enthält einige interessante Inhalte."
      },
      {
          id: 5,
          title: "Fünfter Blogeintrag",
          author_id: 105,
          description: "Der letzte Testeintrag mit einer passenden Beschreibung.",
          content_text: "In diesem Blogeintrag gibt es ebenfalls relevanten Inhalt."
      }
  ]);
  }

}
