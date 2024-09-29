const Usuario = require("../models/Usuario");

class UsuarioController {
  async listarUsuarios(request, response) {
    try {
      const usuarios = await Usuario.findAll({
        order: [["nome", "ASC"]],
        where: nome ? { nome: nome } : {},
        attributes: [
          ["id", "identificador"],
          "nome",
          "sexo",
          "email",
          "isAdmin",
        ],
      });

      if (usuarios.lenth === 0) {
        return response
          .status(400)
          .json({ mensagem: "Não há usuários cadastrados" });
      }

      return response
        .status(200)
        .json({ mensagem: "Usuário listado com sucesso", usuarios });
    } catch (error) {
      console.log("Server erro" + error);
      return response.status(500).json({ mensagem: "Erro ao listar usuários" });
    }
  }

  async editarUsuario(request, response) {
    try {
      const { idUsuario } = request.params;
      const dados = request.body;

      const usuario = await Usuario.findOne({
        where: { idUsuario },
      });

      if (!usuario) {
        return response.status(404).json({
          mensagem: "Usuario não existe",
        });
      }

      usuario.nome = nome || dados.nome;
      usuario.sexo = sexo || dados.sexo;
      usuario.endereco = endereco || dados.endereco;
      usuario.email = email || dados.email;
      usuario.data_nascimento = data_nascimento || dados.data_nascimento;
    } catch (error) {
      console.error("Server error: " + error);
      return response.status(500).json({ mensagem: "Erro ao editar os dados" });
    }
  }

  async deletarUsuario(request, resposne) {
    try {
      const dados = await findByPk(idUsuairio);
    } catch (error) {
      console.error("Server error: " + error);
      return response
        .status(500)
        .json({ mensagem: "Erro ao deletar ussuario" });
    }
  }
}

module.exports = new UsuarioController();
