export default (connection, DataTypes) => {
    connection.define(
      "Contact",
      {
        // Model attributes are defined here
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        message: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        timestamp: true,
      }
    );
  };