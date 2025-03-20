#!/bin/bash

mkdir -p init/pics

# Liste der Bild-URLs (ersetze durch deine gewünschten Bilder)
IMAGE_URLS=(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/F40_Ferrari_20090509.jpg/800px-F40_Ferrari_20090509.jpg"
    "https://shop.sg-power.de/media/image/g0/cd/f9/IMG_1624_4_2048x_sg5a364034b1621.jpg"
    "https://imgcdn.oto.com/large/gallery/color/29/226/nissan-juke-color-519620.jpg"
    "https://images.prismic.io/shacarlacca/Zv0g57VsGrYSwRi7_skoda-kodiaq-serie-daten.jpg?auto=format,compress&rect=0,279,5000,2778&w=1440&h=800"
    "https://www.abt-sportsline.de/fileadmin/_processed_/7/0/csm_ABT_XGT_1__5__b84a9b4f2a.jpg"
)

# Bilder herunterladen, falls sie noch nicht existieren
for i in "${!IMAGE_URLS[@]}"; do
    IMAGE_NAME="image$((i+1)).jpg"
    IMAGE_PATH="init/pics/$IMAGE_NAME"

    if [[ -f "$IMAGE_PATH" ]]; then
        echo "✅ $IMAGE_NAME existiert bereits, überspringe Download."
    else
        echo "📥 Lade $IMAGE_NAME herunter..."
        curl -o "$IMAGE_PATH" "${IMAGE_URLS[$i]}" --silent

        if [[ $? -eq 0 ]]; then
            echo "✅ Erfolgreich gespeichert: $IMAGE_PATH"
        else
            echo "❌ Fehler beim Herunterladen: ${IMAGE_URLS[$i]}"
        fi
    fi
done

echo "📢 Alle Bilder sind bereit!"

docker compose down
docker compose up --build -d
# MongoDB Container Name
CONTAINER_NAME="BlogMongoDb"

# MongoDB Zugangsdaten
MONGO_USER="admin"
MONGO_PASSWORD="weLoveMongo"

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