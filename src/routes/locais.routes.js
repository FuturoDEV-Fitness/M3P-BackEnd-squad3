const { Router } = require("express");
const LocalController = require("../controllers/LocalController");

const localRouters = new Router();

localRouters.post("/cadastro-local", LocalController.criarLocal);
localRouters.get("/todos-locais", LocalController.listarTodos);
localRouters.get(
  "/locais-usuario-autentic",
  LocalController.listarLocaisUsuario
);
localRouters.get("/:lista-local_id", LocalController.listarPorId);
localRouters.put("/:atualizar-local_id", LocalController.atualizar);
localRouters.delete("/:excluir-local_id", LocalController.excluir);
localRouters.get("/:local_id/maps", LocalController.getGoogleMapsLink);

module.exports = localRouters;
