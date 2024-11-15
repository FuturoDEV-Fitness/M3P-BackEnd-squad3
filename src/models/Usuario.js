const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Usuario = connection.define("usuarios", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.ENUM("Masculino", "Feminino", "Outro"),
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isLog: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
});

module.exports = Usuario;
