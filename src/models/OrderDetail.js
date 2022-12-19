const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "OrderDetail",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "order_id",
      },
      foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "food_id",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "order_details",
      // disable createdAt, updatedAt
      timestamps: false,
    }
  );
};
