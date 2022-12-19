const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Food",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "restaurant_id",
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "category_id",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "foods",
      // disable createdAt, updatedAt
      timestamps: false,
    }
  );
};
