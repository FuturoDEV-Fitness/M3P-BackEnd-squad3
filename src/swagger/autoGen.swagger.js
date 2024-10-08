const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Exercita365",
    description: "API de local para atividade física",
    version: "1.0",
  },
  host: "localhost:3000",
  security: [{ apiKeyAuth: [] }],
  securityDeficnitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Baerer <token>",
    },
  },
};

const arquivoSaida = "./src/routes.views/doc.swagger.json";
const arquivoRotas = ["./src/routes.views/routes.js"];

swaggerAutogen(arquivoSaida, arquivoRotas, doc);
