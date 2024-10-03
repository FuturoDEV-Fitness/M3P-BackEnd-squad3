const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Local = connection.define(
  "locais",
  {
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
    descricaoLocal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    itens_checkbox: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    rua_endereco: {
      type: DataTypes.STRING(90),
      allowNull: true,
    },
    numero_endereco: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bairro_endereco: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cidade_endereco: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado_endereco: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cep_endereco: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    complemento_endereco: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    horario_funcionamento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    google_maps_link: {
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

    // Usuario.hasMany(Post, { onDelete: 'CASCADE' });
  },
  {
    timestamps: true,
    tableName: "exercise_locals",
  }
);

Local.associate = function (models) {
  Local.hasMany(models.Avaliacao, {
    foreignKey: "idLocal",
    as: "avaliacoes",
  });
};

// Local.hasMany(Avaliacao, { foreignKey: "idLocal" });

module.exports = Local;
