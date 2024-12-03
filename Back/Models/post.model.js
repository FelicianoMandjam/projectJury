export default (connection, DataTypes) => {
  connection.define(
    "Post",
    {
      // Model attributes are defined here
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assurez-vous que cette clé étrangère est obligatoire
      },
    },
    {
      timestamp: true,
    }
  );
};
