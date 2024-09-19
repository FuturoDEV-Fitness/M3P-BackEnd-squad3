const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const connection = require("./database/connection");

require("dotenv").config();

class Server {
  constructor() {
    this.server = express();
    this.APP_PORT = process.env.APP_PORT || 3000;
    this.middlewares();
    this.database();
    this.routes();
    this.initializeServer();
  }

  async middlewares() {
    console.log("Executando middlewares");
    this.server.use(cors());
    this.server.use(express.json());
    console.log("Middlewares executados");
  }

  async database() {
    try {
      console.log("Conectando ao banco de dados");
      await connection.authenticate();
      console.log("Conectado ao banco de dados");
    } catch (error) {
      console.log("Erro ao conectar ao banco de dados", error);
    }
  }

  async routes() {
    console.log("Executando rotas");
    this.server.use(routes);
    console.log("Rotas executadas");
  }

  async initializeServer() {
    server.listen(APP_PORT, () => {
      console.log(`Servidor rodando na porte: ${APP_PORT}`);
    });
  }
}

module.exports = Server;
