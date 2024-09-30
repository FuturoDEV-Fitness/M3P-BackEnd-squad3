"use strict";

const { all } = require("axios");
const { password } = require("../../config/database.config");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("locais", {
      idLocal: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nomeLocal: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      descricaoLocal: {
        type: Sequelize.TEXT(300),
        allowNull: false,
      },
      itens_checkbox: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      rua_endereco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero_endereco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bairro_endereco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cidade_endereco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estado_endereco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cep_endereco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      complemento_endereco: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      horario_funcionamento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      latitude: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      longitude: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("locais");
  },
};
