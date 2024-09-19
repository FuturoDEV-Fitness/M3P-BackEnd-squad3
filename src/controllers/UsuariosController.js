const Usuario = require("../models/Usuario");

class UsuarioController {
  async criar(req, res) {
    try {
      const dados = req.body;
      const usuario = await Usuario.create(dados);
      return res.status(201).json({ usuario });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}

module.exports = new UsuarioController();
