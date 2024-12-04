export default (connection, DataTypes) => {
  connection.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false, // Le contenu du commentaire est obligatoire
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Relie le commentaire à un post
        references: {
          model: "Posts", // Nom de la table des posts
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Optionnel : si vous voulez identifier l'utilisateur qui a commenté
        references: {
          model: "Users", // Nom de la table des utilisateurs
          key: "id",
        },
      },
    },
    {
      timestamps: true, // Ajoute automatiquement createdAt et updatedAt
    }
  );
};
