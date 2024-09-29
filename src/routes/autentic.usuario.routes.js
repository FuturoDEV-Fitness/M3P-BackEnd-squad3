const { Router } = require("express");
const AutenticUsuarioController = require("../controllers/AutenticUsuarioController");

const autenticUsuarioRoutes = new Router();

autenticUsuarioRoutes.post("/login", AutenticUsuarioController.login);
autenticUsuarioRoutes.post(
  "/cadastroUsuario",
  AutenticUsuarioController.criarConta
);

module.exports = autenticUsuarioRoutes;
