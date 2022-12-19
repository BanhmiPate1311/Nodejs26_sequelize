const { AppError } = require("../helpers/error");
const { Order, User } = require("../models");

const getOrders = async () => {
  try {
    const orders = await Order.findAll({
      include: "orderDetail",
    });
    return orders;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createOrder = async (data) => {
  try {
    const user = await User.findByPk(data.userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }
    console.log(user.__proto__);
    // const userId = data.userId;
    const createdOrder = await Order.create(data);
    return createdOrder;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getOrders,
  createOrder,
};
