const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const usuarioRoutes = Router();

usuarioRoutes.get("/", UsuarioController.listarUsuarios);
usuarioRoutes.put("/", UsuarioController.editarUsuario);
usuarioRoutes.delete("/", UsuarioController.deletarUsuario);

module.exports = usuarioRoutes;
