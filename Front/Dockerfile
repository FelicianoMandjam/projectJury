# Utilise l'image officielle de node, la dernière version
FROM node:lts-alpine3.20

# Définir le repertoire de travail dans le container, on peut mettre aussi /www
WORKDIR /www

# Copie package.json et le package-lock.json
COPY package*.json ./

# Installer les dépendances avec la commande RUN
RUN npm install

# Copie le reste des fichiers de l'application
COPY . .

# Expose le port
EXPOSE 5173

# Démarrer l'application
CMD ["npm", "run", "dev"]