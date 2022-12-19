const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        field: "first_name",
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        field: "last_name",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "email",
        validate: {
          isEmail: {
            msg: "invalid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,

        // Sẽ được chạy trước khi create/update
        set(value) {
          const salt = bcrypt.genSaltSync();
          const hashedPassword = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hashedPassword);
        },
      },
    },
    {
      tableName: "users",
      // disable createdAt, updatedAt
      timestamps: false,
      // Bỏ qua property password khi tìm kiếm
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
      // Các phương thức được tự động chạy sau một hành động (create/update/delete)
      hooks: {
        // Xóa property password của record được trả ra sau khi create/update thành công
        afterSave: (record) => {
          delete record.dataValues.password;
        },
      },
    }
  );
};
