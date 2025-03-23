import app from './app.js';
import config from "./config.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});