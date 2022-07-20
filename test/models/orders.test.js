import chai, { expect } from 'chai';

import sinonChai from 'sinon-chai';

chai.use(sinonChai)

import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from 'sequelize-test-helpers';

import orderModel from '../../src/database/models/order.js';
import clientModel from '../../src/database/models/client.js';
import assetModel from '../../src/database/models/asset.js';


describe('Verifica se Order model existe, se tem as suas propriedades e se possui as associações corretas', () => {
  const Order = orderModel(sequelize, dataTypes);
  const Client = clientModel(sequelize, dataTypes);
  const Asset = assetModel(sequelize, dataTypes);
  const order = new Order();

  checkModelName(Order)('Order');

  context('Verifica se existe todas as propriedades no model', () => {
    [
      'clientId',
      'assetId',
      'quantity',
      'value',
      'created',
    ].forEach(checkPropertyExists(order));
  });

  context('Verifica se existe todas as associações no model', () => {

    before(() => {
      Order.associate({ Client });
      Order.associate({ Asset });
    });

    it('Verifica se uma Order pertence a um Client', () => {
      expect(Order.belongsTo).to.have.been.calledWith(Client)
    }) 
    
    it('Verifica se uma Order tem um Asset', () => {
      expect(Order.hasOne).to.have.been.calledWith(Asset)
    })
  });
});