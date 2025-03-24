# Verwende ein Node.js-Image als Basis
FROM node:16

# Erstelle das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die package.json und package-lock.json (falls vorhanden) in den Container
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Codes in das Arbeitsverzeichnis
COPY . .

# Exponiere Port 5000, um mit dem Backend zu kommunizieren
EXPOSE 5000

# Starte die Node.js-Anwendung
CMD ["node", "server.js"]
