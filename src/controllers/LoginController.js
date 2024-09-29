const Usuario = require("../models/Usuario");
const { compareSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");

class LoginController {
  async login(request, response) {
    const { email, password_hash } = request.body;

    try {
      const user = await Usuario.findOne({ where: { email } });
      if (!user) {
        return response.status(404).json({ mensagem: "Conta não encontrada" });
      }

      const senhaCorreta = compareSync(password_hash, user.password_hash);

      if (!senhaCorreta) {
        return response
          .status(401)
          .json({ mensagem: "Usuário ou senha inválido" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return response.status(200).json({ token: token, nome: usuario.nome });
    } catch (error) {
      console.error("Server error" + error);
      return response.status(500).json({ mensagem: "Erro ao realizar login" });
    }
  }
}

module.exports = new LoginController();
