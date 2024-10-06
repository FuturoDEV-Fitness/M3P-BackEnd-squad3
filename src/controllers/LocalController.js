const { Op } = require("sequelize");
const axios = require("axios");
const Local = require("../models/Local");
const Usuario = require("../models/Usuario");

class LocalController {
  async criarLocal(request, response) {
    try {
      const { idUsuario } = request;
      const dados = request.body;
      if (
        !dados.nomeLocal ||
        !dados.descricao ||
        !dados.cep_endereco ||
        !dados.rua ||
        !dados.bairro ||
        !dados.cidade ||
        !dados.estado ||
        !dados.numero
      )
        return response.status(400).json({
          mensagem: "Nome do local, CEP, tipos de exercícios são obrigatórios",
        });

      const linkMap = `https://www.google.com/maps?q=${dados.latitude},${dados.longitude}`;
      console.log(linkMap);

      const possuiCadastroLocal = await Local.findOne({
        where: {
          nomeLocal: dados.nomeLocal,
          cep_endereco: dados.cep_endereco,
          numero: dados.numero,
        },
      });

      if (possuiCadastroLocal) {
        return response.status(409).json({
          mensagem: "Local já cadastrado",
        });
      }

      const local = await Local.create({
        nomeLocal: dados.nomeLocal,
        descricao: dados.descricao,
        itens_checkbox: dados.itens_checkbox,
        cep_endereco: dados.cep_endereco,
        rua: dados.rua,
        bairro: dados.bairro,
        cidade: dados.cidade,
        estado: dados.estado,
        numero: dados.numero,
        idUsuario: idUsuario,
        complemento: dados.complemento,
        latitude: dados.latitude,
        longitude: dados.longitude,
        linkMap: linkMap,
      });

      return response
        .status(201)
        .json({ mensagem: "Local cadastrado com sucesso!", local });
    } catch (error) {
      console.error("Server error: " + error);
      return response
        .status(500)
        .json({ mensagem: "Houve um erro ao cadastrar o local" });
    }
  }

  async listarLocaisUsuario(request, response) {
    try {
      const { idUsuario } = request;

      const locais = await Local.findAll({
        where: {
          idUsuario: idUsuario,
        },

        include: [
          {
            model: Usuario,
            attributes: ["nome", "id"],
          },
        ],
      });
      response.json(locais);
    } catch (error) {
      console.log(error);
      response.status(500).json({ mensagem: "Erro ao listar os locais!" });
    }
  }

  async listarPorId(request, response) {
    try {
      const idLocal = request.params.id;

      const local = await Local.findByPk(idLocal);

      if (!local) {
        return response
          .status(404)
          .json({ mensagem: "Local não encontrado ou acesso não autorizado" });
      }

      return response.status(200).json(local);
    } catch (error) {
      console.error("Server error: " + error);
      return response
        .status(500)
        .json({ mensagem: "Houve um erro ao buscar o local" });
    }
  }

  async atualizar(request, response) {
    try {
      const idLocal = request.params.id;
      const { idUsuario } = request;
      const dados = request.body;
      console.log(dados);

      const local = await Local.findByPk(idLocal);
      if (!local) {
        return response
          .status(404)
          .json({ mensagem: "Local não encontrado ou acesso não autorizado" });
      }

      const linkMap = `https://www.google.com/maps?q=${dados.latitude},${dados.longitude}`;

      local.nomeLocal = dados.nomeLocal;
      local.descricao = dados.descricao;
      local.itens_checkbox = dados.itens_checkbox;
      local.rua = dados.rua;
      local.numero = dados.numero;
      local.bairro = dados.bairro;
      local.cidade = dados.cidade;
      local.estado = dados.estado;
      local.cep_endereco = dados.cep_endereco;
      local.complemento = dados.complemento;
      local.latitude = dados.latitude;
      local.longitude = dados.longitude;

      local.linkMap = linkMap;
      local.idUsuario = idUsuario;

      await local.save();

      return response.status(200).json(local);
    } catch (error) {
      console.error("Server erro: " + error);
      return response.status(500).json({
        mensagem: `Houve um erro ao atualizar o local`,
      });
    }
  }

  async excluir(request, response) {
    try {
      const idLocal = request.params.id;
      const { idUsuario } = request;

      const local = await Local.findOne({
        where: { idLocal: idLocal, idUsuario: idUsuario },
      });

      if (!local) {
        console.log(
          "Local não encontrado ou acesso não autorizado: p/ excluir"
        );
        return response
          .status(404)
          .json({ mensagem: "Local não encontrado ou acesso não autorizado" });
      }

      await local.destroy();

      return response
        .status(200)
        .json({ mensagem: "Local deletado com sucesso!", local });
    } catch (error) {
      console.error("Erro no método excluir:", error);

      if (error.nomeLocal === "SequelizeForeignKeyConstraintError") {
        return response.status(400).json({
          mensagem:
            "Erro de restrição de chave estrangeira ao excluir o local.",
        });
      } else if (error.nomeLocal === "SequelizeDatabaseError") {
        return response
          .status(500)
          .json({ mensagem: "Erro no banco de dados ao excluir o local." });
      } else {
        return response.status(500).json({
          mensagem:
            "Houve um erro ao excluir o local. Por favor, tente novamente mais tarde.",
        });
      }
    }
  }

  async getGoogleMapsLink(request, response) {
    try {
      const { idLocal } = request.params;
      const idUsuario = request.usuarioId;

      const local = await Local.findOne({
        where: { id: idLocal, idUsuario },
      });

      if (!local) {
        return response
          .status(404)
          .json({ mensagem: "Local não encontrado ou acesso não autorizado" });
      }

      if (!local.latitude || !local.longitude) {
        return response.status(404).json({
          mensagem: "Coordenadas não encontradas para o endereço fornecido",
        });
      }

      const googleMapsLink = `https://www.google.com/maps/place/@${local.latitude},${local.longitude},15z`;

      return response.status(200).json({
        mensagem: "Mapa do local buscado com sucesso!",
        googleMapsLink,
      });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ mensagem: "Houve um erro ao obter o link do Google Maps" });
    }
  }

  async buscarCoordenadas(request, response) {
    try {
      const { cep_endereco } = request.query;

      if (!cep_endereco) {
        return response.status(400).json({ mensagem: "CEP não fornecido" });
      }

      const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        cep_endereco
      )}&format=json&limit=1`;
      const nominatimResponse = await axios.get(nominatimUrl);
      const [locationData] = nominatimResponse.data;

      if (!locationData) {
        return response.status(404).json({
          mensagem: "Coordenadas não encontradas para o endereço fornecido",
        });
      }

      const googleMapsLink = `https://www.google.com/maps/place/@${locationData.lat},${locationData.lon}`;

      return response.status(200).json({ googleMapsLink });
    } catch (error) {
      console.error("Server error: " + error);
      return response
        .status(500)
        .json({ mensagem: "Houve um erro ao buscar as coordenadas" });
    }
  }
}

module.exports = new LocalController();
