const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const Usuario = require("./Usuario");
const Local = require("./Local");

const Avaliacao = connection.define("locais", {
  idAvaliacao: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nota: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
    validate: {
      min: 0.0,
      max: 5.0,
    },
  },
  feedback: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idUsuario: {
    type: DataTypes,
    allowNull: false,
    references: {
      model: "Usuario",
      key: "id",
    },
  },
  nomeUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "Usuarios",
      key: "nome",
    },
  },
  idLocal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Local",
      key: "idLocal",
    },
  },
  nomeLocal: {
    type: DataTypes,
    STRING,
    allowNull: false,
    references: {
      model: "Local",
      key: "nomeLocal",
    },
  },
});

module.exports = Avaliacao;
