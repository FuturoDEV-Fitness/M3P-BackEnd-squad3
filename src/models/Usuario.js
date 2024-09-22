const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const { hashSync } = require("bcryptjs");

const Usuario = connection.define("usuarios", {
  nome: {
    type: DataTypes.STRING,
  },
  sexo: {
    type: DataTypes.STRING,
  },
  cpf: {
    type: DataTypes.STRING,
  },
  endereco: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password_hash: {
    type: DataTypes.STRING,
  },
  data_nacimento: {
    type: DataTypes.STRING,
  },
});

Usuario.beforeSave((usuario) => {
  if (usuario.password_hash) {
    usuario.password_hash = hashSync(usuario.password_hash, 10);
  }
  return usuario;
});

module.exports = Usuario;
