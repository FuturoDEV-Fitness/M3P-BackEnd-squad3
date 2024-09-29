const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const usuarioRoutes = Router();

usuarioRoutes.post("/", UsuarioController.criarConta);
usuarioRoutes.get("/", UsuarioController.listarUsuarios);
usuarioRoutes.put("/", UsuarioController.editarUsuario);
usuarioRoutes.delete("/", UsuarioController.deletarUsuario);

module.exports = usuariosRoutes;
