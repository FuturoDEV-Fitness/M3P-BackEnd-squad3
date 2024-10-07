const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const Usuario = require("./Usuario");
const Local = require("./Local");

const Rating = connection.define("ratings", {
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
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  nomeUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "nome",
    },
  },
  idLocal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "exercise_locals", 
      key: "idLocal",
    },
  },
  nomeLocal: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "exercise_locals", 
      key: "nomeLocal",
    },
  },
});

// Estabelecendo os relacionamentos
Rating.belongsTo(Usuario, { foreignKey: 'idUsuario' });
Rating.belongsTo(Local, { foreignKey: 'idLocal' });

module.exports = Rating;
