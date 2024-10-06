const Local = require("../models/Local");

class PublicLocaisController {
  async listarTodos(request, response) {
    try {
      const { nomeLocal } = request.query;

      const local = await Local.findAll({});

      if (local.length === 0) {
        return response
          .status(404)
          .json({ mensagem: "Não existe locais cadastrados" });
      } else {
        return response.json(local);
      }
    } catch (error) {
      console.log("Server error: " + error);
      response.status(500).json({ mensagem: "Erro ao listar locais" });
    }
  }
}

module.exports = new PublicLocaisController();
