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
    },
    {
      timestamp: true,
    }
  );
};
