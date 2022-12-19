const { response } = require("../helpers/response");
const resService = require("../services/restaurant.service");

const getRestaurants = () => {
  return async (req, res, next) => {
    try {
      const restaurants = await resService.getRestaurants();
      res.status(200).json(response(restaurants));
    } catch (error) {
      next(error);
    }
  };
};

const getResByID = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const restaurants = await resService.getResByID(id);
      res.status(200).json(response(restaurants));
    } catch (error) {
      next(error);
    }
  };
};

const createRestaurant = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const createdRes = await resService.createRestaurant(data);
      res.status(200).json(response(createdRes));
    } catch (error) {
      next(error);
    }
  };
};

const updateRes = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedRes = await resService.updateRes(id, data);
      res.status(200).json(response(updatedRes));
    } catch (error) {
      next(error);
    }
  };
};

const deleteRes = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      await resService.deleteRes(id);
      res.status(200).json(response(true));
    } catch (error) {
      next(error);
    }
  };
};

// POST localhost:4000/restaurants/:restaurantId/like - body: {userId: 1}
const likeRes = () => {
  return async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const { userId } = req.body;
      await resService.likeRes(userId, restaurantId);
      res.status(200).json(response("OK"));
    } catch (error) {
      next(error);
    }
  };
};

// GET localhost:4000/restaurants/:restaurantId/getLikeByRes
const getLikeByRes = () => {
  return async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const likeByRes = await resService.getLikeByRes(restaurantId);
      res.status(200).json(response(likeByRes));
    } catch (error) {
      next(error);
    }
  };
};

// GET localhost:4000/restaurants/:userId/getLikeByUser
const getLikeByUser = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;
      const likeByUser = await resService.getLikeByUser(userId);
      res.status(200).json(response(likeByUser));
    } catch (error) {
      next(error);
    }
  };
};

// POST localhost:4000/restaurants/:restaurantId/rate - body: {userId: 1}
const rateRes = () => {
  return async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const { userId, amount } = req.body;
      await resService.rateRes(userId, restaurantId, amount);
      res.status(200).json(response("OK"));
    } catch (error) {
      next(error);
    }
  };
};

// GET localhost:4000/restaurants/:restaurantId/getRateByRes
const getRateByRes = () => {
  return async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const rateByRes = await resService.getRateByRes(restaurantId);
      res.status(200).json(response(rateByRes));
    } catch (error) {
      next(error);
    }
  };
};

// GET localhost:4000/restaurants/:userId/getRateByUser
const getRateByUser = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;
      const rateByUser = await resService.getRateByUser(userId);
      res.status(200).json(response(rateByUser));
    } catch (error) {
      next(error);
    }
  };
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
