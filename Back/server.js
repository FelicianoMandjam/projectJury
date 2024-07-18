import app from './app.js'
import { env } from './Config/env.js'


// PORT , si dans le .env yapas de déclaration de PORT le port 8080 sera le choix par défaut
const PORT = env.port || 8080;

app.listen(PORT , () => {
    console.log(`API ouverte au port 3001 lien est http;//localhost:${PORT}`);
});

