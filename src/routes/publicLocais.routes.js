const { Router } = require("express");
const PublicLocaisController = require("../controllers/PublicLocaisController");

const publicLocalRouters = new Router();

publicLocalRouters.get("/getAll", PublicLocaisController.listarTodos);

module.exports = publicLocalRouters;
