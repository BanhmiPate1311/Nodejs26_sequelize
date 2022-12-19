const express = require("express");
const { handleErrors } = require("./helpers/error");
const { sequelize } = require("./models");

const app = express();
app.use(express.json());

// Sync model của sequelize với DB
sequelize.sync({ alter: true });

const v1 = require("./routers/v1");
app.use("/api/v1", v1);

app.use(handleErrors);

app.listen(4000);
