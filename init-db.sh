#!/bin/bash
docker compose down
docker compose up --build -d
# MongoDB Container Name
CONTAINER_NAME="BlogMongoDb"

# MongoDB Zugangsdaten
MONGO_USER="admin"
MONGO_PASSWORD="weLoveMongo"
MONGO_AUTH_DB="admin"




# Wartezeit zwischen den Versuchen (Sekunden)
RETRY_DELAY=5

while true; do
    if docker ps --format "{{.Names}}" | grep -q "^$CONTAINER_NAME$"; then
        echo "MongoDB ist aktiv."
        break
    else
        echo "MongoDB läuft nicht. Neuer Versuch in $RETRY_DELAY Sekunden..."
        sleep $RETRY_DELAY
    fi
done

# Prüfen, ob die Datenbank "Blog" existiert
while true; do
  echo "Prüfe, ob die Datenbank 'Blog' existiert..."
  if docker exec "$CONTAINER_NAME" mongosh --quiet -u "$MONGO_USER" -p "$MONGO_PASSWORD" --authenticationDatabase "$MONGO_AUTH_DB" --eval "db.getMongo().getDBNames().includes('Blog')" | grep -q "true"; then
      break;
  else
      echo "Datenbank 'Blog' existiert nicht. Erstelle sie jetzt..."
      docker exec "$CONTAINER_NAME" mongosh -u "$MONGO_USER" -p "$MONGO_PASSWORD" --authenticationDatabase "$MONGO_AUTH_DB" --eval "db.getSiblingDB('Blog').createCollection('init');"
  fi
  sleep 1
done

echo "Datenbank 'Blog' existiert"


# Testdaten importieren
echo "📂 Importiere Testdaten..."
docker exec -i "$CONTAINER_NAME" mongosh -u "$MONGO_USER" -p "$MONGO_PASSWORD" < ./init/import_data.js

echo "✅ Testdaten erfolgreich eingefügt!"



exit 0
