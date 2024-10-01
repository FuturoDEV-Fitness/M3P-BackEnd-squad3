const { Op } = require("sequelize");
const Usuario = require("../models/Usuario");
const padraoEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

class UsuarioController {
  async listarUsuarios(request, response) {
    try {
      const { nome } = request.query;

      const usuarios = await Usuario.findAll({
        order: [["nome", "ASC"]],
        where: nome ? { nome: { [Op.like]: `%${nome}%` } } : {},
        attributes: [
          ["id", "identificador"],
          "nome",
          "sexo",
          "email",
          "isAdmin",
        ],
      });

      if (usuarios.length === 0) {
        return response
          .status(204)
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
      const idUsuario = request.user.id;
      const dados = request.body;
      const { nome, sexo, endereco, email, data_nascimento } = dados;

      if (padraoEmail.test(dados.email) === false) {
        return response
          .status(400)
          .json({ mensagem: "O email está em formato inválido!" });
      }

      if (!nome || !sexo || !endereco || !email || !data_nascimento) {
        return response.status(400).json({
          mensagem: "Todos os campos obrigatórios devem ser preenchidos",
        });
      }

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

      await usuario.save();

      return response
        .status(200)
        .json({ mensagem: "Usuário alterado com sucesso!" });
    } catch (error) {
      console.error("Server error: " + error);
      return response.status(500).json({ mensagem: "Erro ao editar os dados" });
    }
  }

  async deletarUsuario(request, response) {
    try {
      const idUsuario = request.user.id;
      const usuario = await Usuario.findOne({
        where: { id: idUsuario },
      });

      if (!usuario) {
        return response
          .status(404)
          .json({ mensagem: "Usuario não encontrado" });
      }
      await usuario.destroy();
      return response
        .status(200)
        .json({ mensagem: "Usuario deletado com sucesso. ", usuario });
    } catch (error) {
      console.error("Server error: " + error);
      return response
        .status(500)
        .json({ mensagem: "Erro ao deletar ussuario" });
    }
  }
}

module.exports = new UsuarioController();
