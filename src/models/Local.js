const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const { link } = require("../routes/usuarios.routes");
const Usuario = require("./Usuario");

const Local = connection.define("locais", {
  idLocal: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nomeLocal: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  itens_checkbox: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  rua: {
    type: DataTypes.STRING(90),
    allowNull: true,
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cep_endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  complemento: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  linkMap: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
});

Local.belongsTo(Usuario, {
  foreignKey: "idUsuario",
});

module.exports = Local;
