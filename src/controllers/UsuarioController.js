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

      if (dados.email) {
        if (padraoEmail.test(dados.email) === false) {
          return response
            .status(400)
            .json({ mensagem: "O email está em formato inválido!" });
        }
      }

      const usuario = await Usuario.findByPk(idUsuario);

      if (!usuario) {
        return response.status(404).json({
          mensagem: "Usuario não existe",
        });
      }

      usuario.nome = dados.nome || usuario.nome;
      usuario.sexo = dados.sexo || usuario.sexo;
      usuario.cep = dados.cep || usuario.cep;
      usuario.endereco = dados.endereco || usuario.endereco;
      usuario.email = dados.email || usuario.email;
      usuario.data_nascimento =
        dados.data_nascimento || usuario.data_nascimento;
      usuario.isLog = dados.isLog || usuario.isLog;
      usuario.password_hash = usuario.password_hash;

      await usuario.save();

      return response.status(200).json(usuario);
    } catch (error) {
      console.error("Server error: " + error);
      return response.status(500).json({ mensagem: "Erro ao editar os dados" });
    }
  }

  async logout(request, response) {
    try {
      const { idUsuario } = request;
      const dados = request.body;
      const { isLog } = dados;

      const usuario = await Usuario.findByPk(idUsuario);

      if (usuario) {
        usuario.isLog = false;
        await username.save();
        // return response.status(404).json({
        //   mensagem: "Usuario não existe",
        // });
      }
    } catch (error) {
      console.error(error);
      return response.status(500).json({ mensagem: "Server error logout" });
    }
  }

  async isLog(request, response) {
    try {
      const { idUsuario } = request;
      const dados = request.body;
      const { isLog } = dados;

      const usuario = await Usuario.findByPk(idUsuario);
      console.log(usuario);
      // if (!usuario) {
      //   return response.status(404).json({
      //     mensagem: "Usuario não existe",
      //   });
      // }

      // usuario.isLog = isLog || dados.isLog;
      console.log("Antes da atualização:", usuario.isLog);
      usuario.isLog = false;
      await usuario.save();
      console.log("Depois da atualização:", usuario.isLog);

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
