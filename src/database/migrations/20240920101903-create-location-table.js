"use strict";

const { all } = require("axios");
const { password } = require("../../config/database.config");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface,
      createTable("locais", {
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
        idUsuario: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Usuario",
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
    await queryInterface, dropTable("locais");
  },
};
