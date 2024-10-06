const { Router } = require("express");
const LocalController = require("../controllers/LocalController");

const localRouters = new Router();

localRouters.post("/", LocalController.criarLocal);

localRouters.get("/seus-locais", LocalController.listarLocaisUsuario);
localRouters.get("/:id", LocalController.listarPorId);
localRouters.put("/:id", LocalController.atualizar);
localRouters.delete("/:id", LocalController.excluir);
localRouters.get("/:id/maps", LocalController.getGoogleMapsLink);

module.exports = localRouters;
