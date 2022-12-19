// Routers v1
const express = require("express");

const userController = require("../../controllers/user.controller");
const resController = require("../../controllers/restaurant.controller");
const foodController = require("../../controllers/food.controller");
const orderController = require("../../controllers/order.controller");

// path v1: /api/v1
const v1 = express.Router();

// Định nghĩa các routers cho users
v1.get("/users", userController.getUser());
v1.get("/users/:id", userController.getUserByID());
v1.post("/users", userController.createUser());
v1.put("/users/:id", userController.updateUser());
v1.delete("/users/:id", userController.deleteUser());

// Định nghĩa các routers cho restaurants
v1.get("/restaurants", resController.getRestaurants());
v1.get("/restaurants/:id", resController.getResByID());
v1.post("/restaurants", resController.createRestaurant());
v1.put("/restaurants/:id", resController.updateRes());
v1.delete("/restaurants/:id", resController.deleteRes());
v1.post("/restaurants/:restaurantId/like", resController.likeRes());
v1.get("/restaurants/:restaurantId/getLikeByRes", resController.getLikeByRes());
v1.get("/restaurants/:userId/getLikeByUser", resController.getLikeByUser());
v1.post("/restaurants/:restaurantId/rate", resController.rateRes());
v1.get("/restaurants/:restaurantId/getRateByRes", resController.getRateByRes());
v1.get("/restaurants/:userId/getRateByUser", resController.getRateByUser());

// Định nghĩa các routers cho foods
v1.get("/foods", foodController.getFoods());
v1.get("/foods/:id", foodController.getFoodByID());
v1.post("/foods", foodController.createFood());
v1.put("/foods/:id", foodController.updateFood());
v1.delete("/foods/:id", foodController.deleteFood());

// Định nghĩa các routers cho orders
v1.get("/orders", orderController.getOrders());
v1.post("/orders", orderController.createdOrder());

module.exports = v1;
