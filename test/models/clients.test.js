const chai = require('chai');

const sinonChai = require('sinon-chai');

chai.use(sinonChai)

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const clientModel = require('../../src/database/models/client.js');

const orderModel = require('../../src/database/models/order.js');


describe('Verifica se Client model existe, se tem as suas propriedades e se possui as associações corretas', () => {
  const Client = clientModel(sequelize, dataTypes);
  const Order = orderModel(sequelize, dataTypes);
  const client = new Client();

  checkModelName(Client)('Client');

  context('Verifica se existe todas as propriedades no model', () => {
    [
      'name',
      'email',
      'password',
      'cpf',
      'image',
      'adm',
      'balance',
      'phone',
      'address',
      'created',
    ].forEach(checkPropertyExists(client));
  });

  context('Verifica se existe todas as associações no model', () => {

    before(() => {
      Client.associate({ Order });
    });

    it('Verifica se um Client tem muitas Orders', () => {
      chai.expect(Client.hasMany).to.have.been.calledWith(Order)
    }) 
    
  });
});
