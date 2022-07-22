const chai = require('chai');

const sinonChai = require('sinon-chai');

chai.use(sinonChai)

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const orderModel = require('../../src/database/models/order.js');
const clientModel = require('../../src/database/models/client.js');
const assetModel = require('../../src/database/models/asset.js');


describe('Verifica se Order model existe, se tem as suas propriedades e se possui as associações corretas', () => {
  const Order = orderModel(sequelize, dataTypes);
  const Client = clientModel(sequelize, dataTypes);
  const Asset = assetModel(sequelize, dataTypes);
  const order = new Order();

  checkModelName(Order)('Order');

  context('Verifica se existe todas as propriedades no model', () => {
    [
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
      chai.expect(Asset.belongsToMany).to.have.been.calledWith(Client, {
        through: Order,
      })
    }) 
    
    it('Verifica se uma Order tem um Asset', () => {
      chai.expect(Client.belongsToMany).to.have.been.calledWith(Asset, {
        through: Order,
      })
    })
  });
});
