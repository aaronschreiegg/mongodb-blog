# Dockerfile für Node.js (Backend)
FROM node:20-alpine

# Arbeitsverzeichnis im Container erstellen
WORKDIR /app

# package.json und package-lock.json kopieren
COPY package*.json ./

# Abhängigkeiten installieren
RUN npm install

# Anwendungskodex kopieren
COPY . ./

# Exponiere den Port, auf dem die App läuft
EXPOSE 5000

# Startbefehl für den Server
CMD ["node", "index.js"]
