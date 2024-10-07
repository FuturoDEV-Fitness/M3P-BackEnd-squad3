'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('locais', 'itens_checkbox', {
      type: Sequelize.STRING(),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('locais', 'itens_checkbox', {
      type: Sequelize.STRING(), 
      allowNull: false,
    });
  },
};
