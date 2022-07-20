import chai, { expect } from 'chai';

import sinonChai from 'sinon-chai';

chai.use(sinonChai)

import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from 'sequelize-test-helpers';

import assetModel from '../../src/database/models/asset.js';
import orderModel from '../../src/database/models/order.js';


describe('Verifica se Asset model existe, se tem as suas propriedades e se possui as associações corretas', () => {
  const Asset = assetModel(sequelize, dataTypes);
  const Order = orderModel(sequelize, dataTypes);
  const asset = new Asset();

  checkModelName(Asset)('Asset');

  context('Verifica se existe todas as propriedades no model', () => {
    [
      'name',
      'quantity',
      'value',
      'created',
    ].forEach(checkPropertyExists(asset));
  });

  context('Verifica se existe todas as associações no model', () => {

    before(() => {
      Asset.associate({ Order });
    });

    it('Verifica se um Asset está em muitas Orders', () => {
      expect(Asset.belongsToMany).to.have.been.calledWith(Order)
    }) 
    
  });
});