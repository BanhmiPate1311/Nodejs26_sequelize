const { AppError } = require("../helpers/error");
const { Restaurant, User } = require("../models");

const getRestaurants = async () => {
  try {
    const restaurants = await Restaurant.findAll({
      include: [
        "owner",
        {
          association: "userLikes",
          // attributes:{
          //   exclude:["email","password"]
          // },
          through: {
            attributes: [],
          },
        },
      ],
    });
    return restaurants;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getResByID = async (id) => {
  try {
    const res = await Restaurant.findByPk(id, {
      include: "owner",
    });

    if (!res) {
      throw new AppError(404, "Restaurant not found");
    }

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createRestaurant = async (data) => {
  try {
    const restaurants = await Restaurant.findOne({
      where: {
        name: data.name,
      },
    });

    // Restaurant đã tồn tại trong DB
    if (restaurants) {
      throw new AppError(400, "Restaurant is existed");
    }

    const createdRes = Restaurant.create(data);
    return createdRes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateRes = async (id, data) => {
  try {
    const res = await Restaurant.findByPk(id);

    if (!res) {
      throw new AppError(400, "Restaurant not found");
    }

    res.set(data);
    await res.save();

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteRes = async (id) => {
  try {
    const res = await Restaurant.findByPk(id);

    if (!res) {
      throw new AppError(400, "Restaurant not found");
    }

    await Restaurant.destroy({ where: { id } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const likeRes = async (userId, restaurantId) => {
  try {
    const res = await Restaurant.findByPk(restaurantId);
    if (!res) {
      throw new AppError(400, "Restaurant not found");
    }
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }
    console.log(res.__proto__);

    // Kiểm tra user đã like restaurant này hay chưa
    const hasLike = await res.hasUserLike(user.id);
    if (hasLike) {
      await res.removeUserLike(user.id);
    } else {
      await res.addUserLike(user.id);
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const getLikeByRes = async (restaurantId) => {
  try {
    const res = await Restaurant.findByPk(restaurantId);
    if (!res) {
      throw new AppError(400, "Restaurant not found");
    }

    const likeByRes = await res.getUserLikes();

    return likeByRes;
  } catch (error) {
    throw error;
  }
};

const getLikeByUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }
    console.log(user.__proto__);
    const likeByUser = await user.getRestaurantLikes();

    return likeByUser;
  } catch (error) {
    throw error;
  }
};

const rateRes = async (userId, restaurantId, amount) => {
  try {
    const res = await Restaurant.findByPk(restaurantId);
    if (!res) {
      throw new AppError(400, "Restaurant not found");
    }
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }
    if (!amount) {
      throw new AppError(400, "Amount invalid");
    }
    console.log(res.__proto__);
    const hasRated = await res.hasUserRate(user.id);

    await res.addUserRate(userId, {
      through: {
        amount,
      },
    });
    if (hasRated) {
      await res.setUserRates(userId, {
        through: {
          amount,
        },
      });
    } else {
      await res.addUserRate(userId, {
        through: {
          amount,
        },
      });
    }

    return null;
  } catch (error) {
    throw error;
  }
};

const getRateByRes = async (restaurantId) => {
  try {
    const res = await Restaurant.findByPk(restaurantId);

    if (!res) {
      throw new AppError(400, "Restaurant not found");
    }
    const rateByRes = await res.getUserRates();

    return rateByRes;
  } catch (error) {
    throw error;
  }
};

const getRateByUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }
    console.log(user.__proto__);
    const rateByUser = await user.getRestaurantRates();
    return rateByUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRestaurants,
  getResByID,
  createRestaurant,
  updateRes,
  deleteRes,
  likeRes,
  getLikeByRes,
  getLikeByUser,
  rateRes,
  getRateByRes,
  getRateByUser,
};
