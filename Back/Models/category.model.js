export default (connection, DataTypes) => {
    connection.define(
      "Category",
      {
        // Model attributes are defined here
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        timestamp: true,
      }
    );
  };
  