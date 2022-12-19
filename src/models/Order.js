const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "total_price",
      },
      discount: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "orders",
      // disable createdAt, updatedAt
      timestamps: false,
    }
  );
};
