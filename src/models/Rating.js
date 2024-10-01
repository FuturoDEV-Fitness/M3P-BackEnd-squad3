const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Avaliacao = connection.define("avaliacoes", {
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
      model: "usuarios", // Nome correto da tabela de usuários
      key: "id",
    },
  },
  idLocal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "locais", // Nome correto da tabela de locais
      key: "idLocal",
    },
  },
}, {
  timestamps: true,
  tableName: "avaliacoes",
});

module.exports = Avaliacao;
