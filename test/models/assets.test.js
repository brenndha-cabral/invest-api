const chai = require('chai');

const sinonChai = require('sinon-chai');

chai.use(sinonChai)

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const assetModel = require('../../src/database/models/asset.js');
const orderModel = require('../../src/database/models/order.js');


describe('Verifica se Asset model existe, se tem as suas propriedades e se possui as associações corretas', () => {
  const Asset = assetModel(sequelize, dataTypes);
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

    it('Verifica se um Asset tem muitas Orders', () => {
      chai.expect(Asset.hasMany).to.have.been.calledWith(Order)
    }) 
    
  });
});