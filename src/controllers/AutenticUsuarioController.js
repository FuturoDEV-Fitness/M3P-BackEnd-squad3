const Usuario = require("../models/Usuario");
const { compareSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const padraoEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

class AutenticUsuarioController {
  async criarConta(request, response) {
    try {
      const dados = request.body;

      if (
        !dados.nome ||
        !dados.sexo ||
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

      if (dados.password.length < 5 || dados.password.length > 10) {
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
        password: dados.password,
        data_nascimento: dados.data_nascimento,
      });
      return response.status(201).json({
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
    const { email, password } = request.body;

    try {
      const user = await Usuario.findOne({ where: { email } });
      if (!user) {
        return response.status(404).json({ mensagem: "Conta não encontrada" });
      }

      const senhaCorreta = compareSync(password, user.password);

      if (!senhaCorreta) {
        return response
          .status(401)
          .json({ mensagem: "Usuário ou senha inválido" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return response.status(200).json({ token: token, nome: user.nome, id: user.id }); // Corrigido aqui
    } catch (error) {
      console.error("Server error" + error);
      return response.status(500).json({ mensagem: "Erro ao realizar login" });
    }
  }
}

module.exports = new AutenticUsuarioController();
