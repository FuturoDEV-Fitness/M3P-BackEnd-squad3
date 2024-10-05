const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const usuarioRoutes = Router();

usuarioRoutes.get("/:id", UsuarioController.listarUm);
usuarioRoutes.put("/:id", UsuarioController.editarUsuario);
usuarioRoutes.delete("/:id", UsuarioController.deletarUsuario);

module.exports = usuarioRoutes;
