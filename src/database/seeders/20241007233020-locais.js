'use strict';

const { hashSync } = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        nomeLocal: 'Canto Sul da Praia dos Ingleses',
        descricao: 'Mar de águas calmas e cristalinas',
        itens_checkbox: 'Alongamento,Caminhada,Corrida,Yoga',
        rua: 'Estrada Dom João Becker',
        numero: 'sn,',
        bairro: 'Ingleses',
        cidade: 'Florianópolis',
        estado: 'SC',
        cep_endereco: '88058600',
        complemento: 'Final das dunas',
        latitude: '-27.443182',
        longitude: '-48.377652',
        linkMap : 'https://www.google.com/maps?q=-27.443182,-48.377652',
        idUsuario: '21',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        nomeLocal: 'Praia do Campeche',
        descricao: 'Água cristalina e mar agitado',
        itens_checkbox: 'Caminhada,Corrida,Yoga,Surf',
        rua: 'Estrada do Campeche',
        numero: 'sn,',
        bairro: 'Campeche',
        cidade: 'Florianópolis',
        estado: 'SC',
        cep_endereco: '88063660',
        complemento: 'Praia',
        latitude: '-27.666044',
        longitude: '-48.477029',
        linkMap : 'https://www.google.com/maps?q=-27.666044,-48.477029',
        idUsuario: '21',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
    ]
    
    await queryInterface.bulkInsert('locais', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('locais', null, {});
  }
}