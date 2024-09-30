const axios = require("axios");
const Local = require("../models/Local");
const Usuario = require("../models/Usuario");

class LocalController {
  // Método para criar um novo local
  async criarLocal(request, response) {
    try {
      const dados = request.body;

      // Validação dos dados
      if (
        (!dados.nomeLocal ||
          !dados.descricaoLocal ||
          !dados.cep_endereco ||
          !dados.rua_endereco ||
          !dados.bairro_endereco ||
          !dados.cidade_endereco ||
          !dados.estado_endereco ||
          !dados.numero_endereco,
        !dados.idUsuario)
      ) {
        return response.status(400).json({
          mensagem:
            "Nome do local, CEP, localidade, tipos de exercícios e usuário são obrigatórios",
        });
      }

      // Verifica se o usuário existe
      const usuario = await Usuario.findByPk(dados.idUsuario);
      if (!usuario) {
        return response
          .status(404)
          .json({ mensagem: "Usuário não encontrado" });
      }

      const possuiCadastroLocal = await Local.findOne({
        where: {
          nome_local: dados.nome_local,
          cep: dados.cep_endereco,
          numero_endereco: dados.numero_endereco,
        },
      });

      if (possuiCadastroLocal) {
        return response.status(409).json({
          mensagem: "Local já cadastrado",
        });
      }

      // Cria o local
      const local = await Local.create({
        nomeLocal: dados.nomeLocal,
        descricao: dados.descricaoLocal,
        itens_checkbox: dados.itens_checkbox,
        cep: dados.cep_endereco,
        rua: dados.rua_endereco,
        bairro: dados.bairro_endereco,
        cidade: dados.cidade_endereco,
        estado: dados.estado_endereco,
        numero_endereco: dados.numero_endereco,
        idUsuario: dados.idUsuario,
        complemento_endereco: dados.complemento_endereco,
        horario_funcionamento: dados.horario_funcionamento,
        latitude: dados.latitude,
        longitude: dados.longitude,
        google_maps_link: dados.google_maps_link,
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

  async listarTodos(request, response) {
    try {
      const { nomeLocal } = request.query;

      const local = await Local.findAll({
        order: [["nomeLocal", "ASC"]],
        where: nomeLocal ? { nomeLocal: nomeLocal } : {},
        attributes: [
          ["id", "identificador"],
          "nomeLocal",
          "descricaoLocal",
          "itens_checkbox",
          "rua_endereco",
          "numero_endereco",
          "bairro_endereco",
          "cidade_endereco",
          "estado_endereco",
          "cep_endereco",
          "horario_funcionamento",
          "latitude",
          "longitude",
        ],
      });

      if (local.length === 0) {
        return response
          .status(404)
          .json({ mensagem: "Não existe locais cadastrados" });
      } else {
        return response.json(local);
      }
    } catch (error) {
      console.log("Server error: " + error);
      response.status(500).json({ mensagem: "Erro ao listar locais" });
    }
  }

  // Método para listar todos os locais do usuário autenticado
  async listarLocaisUsuario(request, response) {
    try {
      const idUsuario = request.idUsuario;

      // Encontra todos os locais do usuário autenticado
      const locais = await Local.findAll({ where: { idUsuario } });

      return response.status(200).json({
        mensagem: "Buscado com sucesso! Locais cadastrados por este usuário",
        locais,
      });
    } catch (error) {
      console.error("Server error: " + error);
      return response
        .status(500)
        .json({ mensagem: "Houve um erro ao listar os locais" });
    }
  }

  // Método para listar um local específico do usuário autenticado
  async listarPorId(request, response) {
    try {
      const { idLocal } = request.params;
      const idUsuario = request.idUsuario;

      // Encontra o local específico e verifica se pertence ao usuário autenticado
      const local = await Local.findOne({ where: { id: idLocal, idUsuario } });

      if (!local) {
        return response
          .status(404)
          .json({ mensagem: "Local não encontrado ou acesso não autorizado" });
      }

      return response
        .status(200)
        .json({ mensagem: "Local buscado com sucesso!", local });
    } catch (error) {
      console.error("Server error: " + error);
      return response
        .status(500)
        .json({ mensagem: "Houve um erro ao buscar o local" });
    }
  }

  // Método para atualizar um local específico do usuário autenticado
  async atualizar(request, response) {
    try {
      const { idLocal } = request.params;
      const dados = request.body;
      const idUsuario = request.idUsuario;

      // Encontra o local específico e verifica se pertence ao usuário autenticado
      const local = await Local.findOne({
        where: { idLocal, idUsuario },
      });

      if (!local) {
        return response
          .status(404)
          .json({ mensagem: "Local não encontrado ou acesso não autorizado" });
      }

      // Atualiza o local
      local.nomeLocal = nome || dados.nomeLocal;
      local.descricaoLocal = descricaoLocal || dados.descricaoLocal;
      (local.itens_checkbox = itens_checkbox || dados.itens_checkbox),
        (local.rua_endereco = rua_endereco || dados.rua_endereco);
      local.numero_endereco = numero_endereco || dados.numero_endereco;
      local.bairro_endereco = bairro_endereco || dados.bairro_endereco;
      local.cidade_endereco = cidade_endereco || dados.cidade_endereco;
      local.estado_endereco = estado_endereco || dados.estado_endereco;
      local.cep_endereco = cep_endereco || dados.cep_endereco;
      (local.complemento_endereco =
        complemento_endereco || dados.complemento_endereco),
        (local.horario_funcionamento =
          horario_funcionamento || dados.horario_funcionamento);
      local.latitude = latitude != undefined ? latitude : local.latitude;
      local.longitude = longitude !== undefined ? longitude : local.longitude;
      local.google_maps_link = google_maps_link || local.google_maps_link;

      await local.save();

      return response
        .status(200)
        .json({ mensagem: "Local editado com sucesso! ", local });
    } catch (error) {
      console.error("Server erro: " + error);
      return response.status(500).json({
        mensagem: `Houve um erro ao atualizar o local`,
      });
    }
  }

  // Método para Deletar um local específico do usuário autenticado
  async excluir(request, response) {
    try {
      const { idLocal } = request.params;
      const idUsuario = request.usuarioId;

      // Encontra o local específico e verifica se pertence ao usuário autenticado
      const local = await Local.findOne({
        where: { id: idLocal, idUsuario },
      });

      if (!local) {
        console.log(
          "Local não encontrado ou acesso não autorizado: p/ excluir"
        );
        return response
          .status(404)
          .json({ mensagem: "Local não encontrado ou acesso não autorizado" });
      }

      // Exclui o local
      await local.destroy();

      return response
        .status(200)
        .json({ mensagem: "Local deletado com sucesso!", local });
    } catch (error) {
      console.error("Erro no método excluir:", error);

      // Mensagem detalhada de erro
      if (error.name === "SequelizeForeignKeyConstraintError") {
        return response.status(400).json({
          mensagem:
            "Erro de restrição de chave estrangeira ao excluir o local.",
        });
      } else if (error.name === "SequelizeDatabaseError") {
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

      // Encontra o local específico e verifica se pertence ao usuário autenticado
      const local = await Local.findOne({
        where: { id: idLocal, idUsuario },
      });

      if (!local) {
        return response
          .status(404)
          .json({ mensagem: "Local não encontrado ou acesso não autorizado" });
      }

      // Verifica se latitude e longitude estão presentes
      if (!local.latitude || !local.longitude) {
        return response.status(404).json({
          mensagem: "Coordenadas não encontradas para o endereço fornecido",
        });
      }

      // Gerar o link do Google Maps com base na latitude e longitude no formato correto
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

      // Verifica se o endereço foi fornecido
      if (!cep_endereco) {
        return response.status(400).json({ mensagem: "CEP não fornecido" });
      }

      // Consulta a API do Nominatim para obter as coordenadas
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

      // Gerar o link do Google Maps com base na latitude e longitude no formato correto
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
