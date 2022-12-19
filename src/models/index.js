// Setup Sequelize
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node26-food", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
});

// Kiểm tra kết nối tới DB
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize Connected");
  } catch (error) {
    console.log("Sequelize Error", error);
  }
})();

// Khởi tạo model
const User = require("./User")(sequelize);
const Restaurant = require("./Restaurant")(sequelize);
const RestaurantLikes = require("./RestaurantLikes")(sequelize);
const RestaurantRates = require("./RestaurantRates")(sequelize);
const Order = require("./Order")(sequelize);
const OrderDetail = require("./OrderDetail")(sequelize);
const Food = require("./Food")(sequelize);

// Định nghĩa relationship giữa các model

// User 1 - n Restaurant
Restaurant.belongsTo(User, { as: "owner", foreignKey: "userId" });
User.hasMany(Restaurant, { as: "restaurants", foreignKey: "userId" });

// User 1 - n RestaurantLikes
// Restaurants 1 - n RestaurantLikes
User.belongsToMany(Restaurant, {
  as: "restaurantLikes",
  through: RestaurantLikes,
  foreignKey: "userId",
});
Restaurant.belongsToMany(User, {
  as: "userLikes",
  through: RestaurantLikes,
  foreignKey: "restaurantId",
});

// User 1 - n RestaurantRates
// Restaurants 1 - n RestaurantRates
User.belongsToMany(Restaurant, {
  as: "restaurantRates",
  through: RestaurantRates,
  foreignKey: "userId",
});
Restaurant.belongsToMany(User, {
  as: "userRates",
  through: RestaurantRates,
  foreignKey: "restaurantId",
});

// User 1 - n Order
Order.belongsTo(User, { as: "user", foreignKey: "userId" });
User.hasMany(Order, { as: "orders", foreignKey: "userId" });

// Order 1 - n OrderDetail
OrderDetail.belongsTo(Order, { as: "order", foreignKey: "orderId" });
Order.hasMany(OrderDetail, { as: "orderDetail", foreignKey: "orderId" });

// OrderDetail 1 - 1 Food
Food.hasOne(OrderDetail, { as: "orderDetail", foreignKey: "foodId" });
OrderDetail.belongsTo(Food, { as: "foods", foreignKey: "foodId" });

// RestaurantRates 1 - n Food
Food.belongsTo(Restaurant, { as: "restaurant", foreignKey: "restaurantId" });
Restaurant.hasMany(Food, { as: "foods", foreignKey: "restaurantId" });

// // User 1 - n Food
// // Food 1 - n User
// User.belongsToMany(Food, {
//   as: "userOrders",
//   through: Order,
//   foreignKey: "userId",
// });
// Food.belongsToMany(User, {
//   as: "foodOrders",
//   through: OrderDetail,
//   foreignKey: "foodId",
// });

module.exports = {
  sequelize,
  User,
  Restaurant,
  Food,
  Order,
};
