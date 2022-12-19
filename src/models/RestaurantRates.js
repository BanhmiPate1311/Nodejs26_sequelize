const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "RestaurantRates",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "restaurant_id",
      },
      amount: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: {
            msg: "must be numeric",
          },
          min: 1,
          max: 5,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "restaurant_rates",
      // disable createdAt, updatedAt
      timestamps: false,
    }
  );
};
