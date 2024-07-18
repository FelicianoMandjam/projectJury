export default (connection, DataTypes) => {
  connection.define(
    "Comment",
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamp: true,
    }
  );
};
