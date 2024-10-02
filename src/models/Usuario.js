const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const { hashSync } = require("bcryptjs");
const Local = require("./Local");
const Avaliacao = require("./Avaliacao");

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
  data_nacimento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Usuario.beforeSave((usuario) => {
  if (usuario.password_hash) {
    usuario.password_hash = hashSync(usuario.password_hash, 10);
  }
  return usuario;
});

Local.belongsTo(Usuario);
Avaliacao.belongsTo(Usuario);

module.exports = Usuario;
