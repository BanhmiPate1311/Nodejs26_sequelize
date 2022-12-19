const { response } = require("../helpers/response");
const orderService = require("../services/order.service");

// GET localhost:4000/orders
const getOrders = () => {
  return async (req, res, next) => {
    try {
      const orders = await orderService.getOrders();
      res.status(200).json(response(orders));
    } catch (error) {
      next(error);
    }
  };
};

// POST localhost:4000/orders
const createdOrder = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const createdOrder = await orderService.createOrder(data);
      res.status(200).json(response(createdOrder));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getOrders,
  createdOrder,
};
