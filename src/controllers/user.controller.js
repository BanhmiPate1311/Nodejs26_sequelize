const { response } = require("../helpers/response");
const userService = require("../services/user.service");

// Controller nhận vào request, response
// Nhiệm vụ: chỉ parse request (params, body) sau đó chuyển xuống Service xử lý, nhận kết quả trả về từ Service và trả response về cho client

const getUser = () => {
  return async (req, res, next) => {
    try {
      const users = await userService.getUser();
      res.status(200).json(response(users));
    } catch (error) {
      next(error);
    }
  };
};

const getUserByID = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserByID(id);
      res.status(200).json(response(user));
    } catch (error) {
      next(error);
    }
  };
};

const createUser = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const createdUser = await userService.createUser(data);
      res.status(200).json(response(createdUser));
    } catch (error) {
      next(error);
    }
  };
};

const updateUser = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedUser = await userService.updateUser(id, data);

      res.status(200).json(response(updatedUser));
    } catch (error) {
      next(error);
    }
  };
};

const deleteUser = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      res.status(200).json(response(true));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getUser,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
};
