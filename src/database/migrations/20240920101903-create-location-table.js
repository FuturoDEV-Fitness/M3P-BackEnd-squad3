"use strict";

const { all } = require("axios");
const { password } = require("../../config/database.config");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface,
      createTable("locais", {
        idLocal: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        nomeLocal: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        descricaoLocal: {
          type: Sequelize.TEXT(300),
          allowNull: false,
        },
        idUsuario: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "usuarios",
            key: "id",
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
      });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
