const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const usuariosRoutes = Router();

usuariosRoutes.post("/", UsuarioController.criar);

module.exports = usuariosRoutes;
