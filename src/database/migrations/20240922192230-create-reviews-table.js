"use strict";

const { all } = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("avaliacoes", {
      idAvaliacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nota: {
        type: Sequelize.DECIMAL(2, 1),
        allowNull: false,
        validate: {
          min: 0.0,
          max: 5.0,
        },
      },
      feedback: {
        type: Sequelize.TEXT(250),
        allowNull: true,
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: "Usuario",
          key: "id",
        },
        nomeUsuario: {
          type: Sequelize.STRING,
          allowNull: false,
          reference: {
            model: "Usuario",
            key: "nome",
          },
        },
        idLocal: {
          type: Sequelize.INTEGER,
          allowNull: false,
          reference: {
            model: "Local",
            key: "idLocal",
          },
        },
        nomeLocal: {
          type: Sequelize.STRING,
          allowNull: false,
          reference: {
            model: "Local",
            key: "nomeLocal",
          },
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("avaliacoes");
  },
};
