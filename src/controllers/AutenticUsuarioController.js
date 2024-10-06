const Usuario = require("../models/Usuario");
const { compareSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const padraoEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const padraoCpf = new RegExp(/^\d{11}$/);

class AutenticUsuarioController {
  async criarConta(request, response) {
    try {
      const dados = request.body;

      // const dataRequired = object.value(dados);
      // for (const field of dataRequired) {
      //   if (!dados[field]) {
      //     return response.status(400).json({
      //       mensagem: "Todos os campos obrigatórios devem ser preenchidos",
      //     });
      //   }
      // }

      if (
        !dados.nome ||
        !dados.sexo ||
        !dados.cep ||
        !dados.cpf ||
        !dados.endereco ||
        !dados.email ||
        !dados.password ||
        !dados.data_nascimento
      ) {
        return response.status(400).json({
          mensagem: "Todos os campos obrigatórios devem ser preenchidos",
        });
      }

      if (padraoEmail.test(dados.email) === false) {
        return response
          .status(400)
          .json({ mensagem: "O email está em formato inválido!" });
      }

      if (dados.password.length < 5 || dados.password.length > 16) {
        return response
          .status(400)
          .json({ mensagem: "A senha deve ser entre 8 e 16 dígitos" });
      }

      const possuiCadastro = await Usuario.findOne({
        where: {
          email: dados.email,
        },
      });
      const cpfExistente = await Usuario.findOne({
        where: {
          cpf: dados.cpf,
        },
      });

      if (cpfExistente) {
        return response
          .status(409)
          .json({ mensagem: "CPF informado já existe" });
      }
      if (padraoCpf.test(dados.cpf) === false) {
        return response.status(400).json({
          mensagem:
            "O cpf está no formato inválido. Formato esperado 00011122233",
        });
      }

      if (possuiCadastro) {
        return response
          .status(409)
          .json({ mensagem: "Usuario já possui cadastro" });
      }

      const usuario = await Usuario.create({
        nome: dados.nome,
        sexo: dados.sexo,
        cpf: dados.cpf,
        cep: dados.cep,
        endereco: dados.endereco,
        email: dados.email,
        password_hash: dados.password,
        data_nascimento: dados.data_nascimento,
        isLog: dados.isLog,
      });
      response.status(201).json({
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

  async login(request, response) {
    try {
      const dados = request.body;

      const user = await Usuario.findOne({
        where: {
          email: dados.email,
        },
      });

      if (!user) {
        return response.status(404).json({ mensagem: "Conta não encontrada" });
      }

      const senhaCorreta = compareSync(dados.password, user.password_hash);

      if (senhaCorreta == false) {
        return response
          .status(401)
          .json({ mensagem: "Usuário ou senha inválido" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return response
        .status(200)
        .json({ token: token, usuarioName: user.nome, usuarioId: user.id });
    } catch (error) {
      console.error("Server error" + error);
      return response.status(500).json({ mensagem: "Erro ao realizar login" });
    }
  }

  async listarUsuarios(request, response) {
    try {
      const usuarios = await Usuario.findAll();

      if (usuarios.length === 0) {
        return response
          .status(204)
          .json({ mensagem: "Não há usuários cadastrados" });
      }

      return response.status(200).json(usuarios);
    } catch (error) {
      console.log("Server erro" + error);
      return response.status(500).json({ mensagem: "Erro ao listar usuários" });
    }
  }
}

module.exports = new AutenticUsuarioController();