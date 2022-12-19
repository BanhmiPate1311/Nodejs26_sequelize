const { response } = require("../helpers/response");
const foodService = require("../services/food.service");

// GET localhost:4000/foods
const getFoods = () => {
  return async (req, res, next) => {
    try {
      const foods = await foodService.getFoods();
      res.status(200).json(response(foods));
    } catch (error) {
      next(error);
    }
  };
};

// GET localhost:4000/foods/:id
const getFoodByID = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const food = await foodService.getFoodByID(id);
      res.status(200).json(response(food));
    } catch (error) {
      next(error);
    }
  };
};

// POST localhost:4000/foods/
const createFood = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const createdFood = await foodService.createFood(data);
      res.status(200).json(response(createdFood));
    } catch (error) {
      next(error);
    }
  };
};

// PUT localhost:4000/foods/:id
const updateFood = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedFood = await foodService.updateFood(id, data);
      res.status(200).json(response(updatedFood));
    } catch (error) {
      next(error);
    }
  };
};

// DELETE localhost:4000/foods/:id
const deleteFood = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      await foodService.deleteFood(id);
      res.status(200).json(response("Deleted"));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getFoods,
  getFoodByID,
  createFood,
  updateFood,
  deleteFood,
};
