import chai, { expect } from 'chai';

import sinonChai from 'sinon-chai';

chai.use(sinonChai)

import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from 'sequelize-test-helpers';

import clientModel from '../../src/database/models/client.js';

import orderModel from '../../src/database/models/order.js';


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
      expect(Client.hasMany).to.have.been.calledWith(Order)
    }) 
    
  });
});
