const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const connection = require("./database/connection");
const SwaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./routes/doc.swagger.json");

require("dotenv").config();

class Server {
  constructor() {
    this.server = express();
    this.APP_PORT = process.env.APP_PORT || 3000;
    this.middlewares();
    this.database();
    this.routes();
    this.initializeSwagger();
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

  async initializeSwagger() {
    console.log("Inicializando Swagger");
    this.server.use(
      "/api-docs",
      SwaggerUI.serve,
      SwaggerUI.setup(swaggerDocument)
    );
    console.log("Swagger inicializado");
  }

  async initializeServer() {
    const timestamp = new Date().toISOString();
    this.server.listen(this.APP_PORT, () => {
      console.log(
        `${timestamp} - Servidor rodando na porta: ${this.APP_PORT} no container e rodando na porta 8080 na máquina`
      );
    });
  }
}

module.exports = Server;
