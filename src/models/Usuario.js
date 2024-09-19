const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Usuario = connection.define("users", {
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password_hash: {
    type: DataTypes.STRING,
  },
});

module.exports = Usuario;
