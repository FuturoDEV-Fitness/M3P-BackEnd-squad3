const Usuario = require("../models/Usuario");
const padraoEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

class UsuarioController {
  async listarUsuarios(request, response) {
    try {
      const usuarios = await Usuario.findAll();

      if (usuarios.lenth === 0) {
        return response
          .status(400)
          .json({ mensagem: "Usuário não encontrado" });
      }

      return response
        .status(200)
        .json({ mensagem: "Usuário listado com sucesso", usuarios });
    } catch (error) {
      console.log("Server erro" + error);
      return response.status(500).json({ mensagem: "Erro ao listar usuários" });
    }
  }
}

module.exports = new UsuarioController();
