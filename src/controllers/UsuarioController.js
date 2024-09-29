const Usuario = require("../models/Usuario");
const padraoEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

class UsuarioController {
  async criarConta(request, response) {
    try {
      const dados = request.body;

      if (
        !dados.nome ||
        !dados.sexo ||
        !dados.cpf ||
        !dados.endereco ||
        !dados.email ||
        !dados.password_hash ||
        !dados.data_nascimento
      ) {
        return response.status(400).json({
          mensage: "Todos os campos obrigatórios devem ser preenchidos",
        });
      }

      if (padraoEmail.test(dados.email) === false) {
        return response
          .status(400)
          .json({ mensagem: "O email está em formato inválido!" });
      }

      if (
        dados.password_hash?.length <= 5 ||
        dados.password_hash?.length >= 10
      ) {
        return response
          .status(400)
          .json({ mensagem: "A senha deve ser entre 5 e 10 dígitos" });
      }

      const possuiCadastro = await Usuario.findOne({
        where: {
          email: dados.email,
        },
      });

      if (possuiCadastro) {
        return response
          .status(409)
          .json({ mensagem: "Usuario já possui cadastro" });
      }

      const usuario = await Usuario.create({
        nome: dados.nome,
        sexo: dados.sexo,
        cpf: dados.cpf,
        endereco: dados.endereco,
        email: dados.email,
        password_hash: dados.password_hash,
        data_nascimento: dados.data_nascimento,
      });
      return res.status(201).json({
        nome: usuario.nome,
        email: usuario.email,
        createdAt: usuario.createdAt,
      });
    } catch (error) {
      console.log("server error:" + error);
      return response
        .status(500)
        .json({ mensagem: "Não foi possível criar a conta" });
    }
  }

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
