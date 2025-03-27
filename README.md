# MongoDB Blog – Subset Pattern

Dieses Repository zeigt ein einfaches Datenmodell für eine Blog-Anwendung mit MongoDB. Es verwendet das Subset Pattern, um bestimmte Daten direkt in Dokumenten zu speichern.

## Konzept

### Entitäten

**BlogUser**
- id  
- username  
- firstname  
- lastname  
- password  
- email  

**BlogEntry**
- id  
- title  
- author_id(s)  
- description  
- creationDates  
- editDates[]  
- impressionCount  
- commentsAllowed  
- content_text  
- content_images[] (Base64)

**BlogCategory**
- id  
- name  

**Comment**
- id  
- blog_entry_id  
- user_id  
- content_text  

## Subset Pattern

Häufig genutzte Daten wie Kommentare, Bilder oder Bearbeitungsdaten sind direkt im BlogEntry-Dokument eingebettet. Das spart Abfragen und verbessert die Lesegeschwindigkeit.

## Autoren

- Aaron
- Simon
- Leopold
- Emil
