const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

<<<<<<< HEAD:src/models/Avaliacao.js
const Avaliacao = connection.define("avaliacoes", {
=======
const Rating = connection.define("ratings", {
>>>>>>> feature/models.rating:src/models/Rating.js
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
      model: "Usuario",
      key: "id",
    },
  },
<<<<<<< HEAD:src/models/Avaliacao.js
=======
  nomeUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "Usuario",
      key: "nome",
    },
  },
>>>>>>> feature/models.rating:src/models/Rating.js
  idLocal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "exercise_locals", 
      key: "idLocal",
    },
  },
<<<<<<< HEAD:src/models/Avaliacao.js
=======
  nomeLocal: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "exercise_locals", 
      key: "nomeLocal",
    },
  },
>>>>>>> feature/models.rating:src/models/Rating.js
});

// Estabelecendo os relacionamentos
Rating.belongsTo(Usuario, { foreignKey: 'idUsuario' });
Rating.belongsTo(Local, { foreignKey: 'idLocal' });

module.exports = Rating;
