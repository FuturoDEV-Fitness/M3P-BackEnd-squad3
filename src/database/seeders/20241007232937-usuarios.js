'use strict';

const { hashSync } = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        nome: 'João Flores',
        sexo: 'Masculino',
        cpf: '12345678911',
        cep: '88058310',
        endereco: 'Servidão Laureano,Ingleses,22,Florianópolis,SC',
        email: 'joao@email.com',
        password_hash: hashSync('12345678', 10),
        data_nascimento: '1995-02-15',
        isLog: 'false',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        nome: 'Mariana',
        sexo: 'Feminino',
        cpf: '12345678922',
        cep: '88058310',
        endereco: 'General Osório,Centro,102,Florianópolis,SC',
        email: 'mariana@email.com',
        password_hash: hashSync('12345678', 10),
        data_nascimento: '1989-02-15',
        isLog: 'false',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    ]
    
    await queryInterface.bulkInsert('usuarios', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
}