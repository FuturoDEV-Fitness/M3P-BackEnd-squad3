const { Op } = require("sequelize");
const Usuario = require("../models/Usuario");
const padraoEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

class UsuarioController {
  async listarUm(request, response) {
    try {
      const id = request.params.id;

      const usuario = await Usuario.findByPk(id);

      if (usuario.length === 0) {
        return response.status(404).json({ mensagem: "Índice não encontrado" });
      }

      response.json(usuario);
    } catch (error) {
      console.log("Server error" + error);
      return response.status(500).json({ mensagem: "Não foi possível listar" });
    }
  }
  async editarUsuario(request, response) {
    try {
      const idUsuario = request.params.id;
      const dados = request.body;
      const { nome, sexo, cep_endereco, endereco, email, data_nascimento } =
        dados;

      if (padraoEmail.test(dados.email) === false) {
        return response
          .status(400)
          .json({ mensagem: "O email está em formato inválido!" });
      }

      if (
        !nome ||
        !sexo ||
        !cep_endereco ||
        !endereco ||
        !email ||
        !data_nascimento
      ) {
        return response.status(400).json({
          mensagem: "Todos os campos obrigatórios devem ser preenchidos",
        });
      }

      const usuario = await Usuario.findByPk(idUsuario);

      if (!usuario) {
        return response.status(404).json({
          mensagem: "Usuario não existe",
        });
      }

      usuario.nome = nome || dados.nome;
      usuario.sexo = sexo || dados.sexo;
      usuario.cep_endereco = cep_endereco || dados.cep_endereco;
      usuario.endereco = endereco || dados.endereco;
      usuario.email = email || dados.email;
      usuario.data_nascimento = data_nascimento || dados.data_nascimento;

      await usuario.save();

      return response.status(200).json(usuario);
    } catch (error) {
      console.error("Server error: " + error);
      return response.status(500).json({ mensagem: "Erro ao editar os dados" });
    }
  }

  async deletarUsuario(request, response) {
    try {
      const idUsuario = request.params.id;
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
      return response.status(500).json({ mensagem: "Erro ao deletar usuario" });
    }
  }
}

module.exports = new UsuarioController();
