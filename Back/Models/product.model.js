export default (connection, DataTypes) => {
    connection.define(
      "Product",
      {
        // Model attributes are defined here
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(20, 2),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
        },
        stock: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        timestamp: true,
      }
    );
  };
  