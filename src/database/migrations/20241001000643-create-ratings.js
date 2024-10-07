"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ratings", {
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
        type: Sequelize.TEXT,
        allowNull: false,
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      idLocal: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "locais",
          key: "idLocal",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue: null, // Ajustado para evitar soft delete imediato
      },
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE ratings
      ADD CONSTRAINT chk_rating
      CHECK (nota IN (0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0));
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ratings");
  },
};
