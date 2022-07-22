const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const sinonChai = require('sinon-chai');
const { makeMockModels } = require('sequelize-test-helpers');

chai.use(sinonChai)


describe('Verifica se Asset service executa corretamente.', () => {

  const Asset = { findOne: sinon.stub() }
  const mockModels = makeMockModels({ Asset })
    
  const { assetById } = proxyquire('../../src/services/assetService', {
      '../../src/database/models': mockModels });
  
  const id = 1;

  const data = {
    id: 1,
    quantity: 25,
    value: 10.00
  }

   let result;

  context('Verifica quando o asset não existe', () => {
    before(async () => {
      Asset.findOne.resolves(undefined);

      result = await assetById(id)
    })

    after(sinon.resetHistory);

    it('Chama a função que verifica se o asset existe', () => {
      chai.expect(Asset.findOne).to.have.been.calledWith(sinon.match({ where: { id } }))
    });

    it('Retorna null caso o asset não exista', () => {
      chai.expect(result).to.be.null
    });
  });

  context('Verifica quando o asset existe', () => {

    before(async () => {

      Asset.findOne.resolves(data);

      result = await assetById(id)

    });

    after(() => {
      sinon.resetHistory
    });

    it('Chama a função que verifica se o asset existe', () => {
      chai.expect(Asset.findOne).to.have.been.calledWith(sinon.match({ where: { id } }))
    })

    it('Verifica se quando o asset existe retorna um objeto com a chave token', () => {
      chai.expect(result).to.be.equal(data);
      chai.expect(result).to.have.a.property("id");
      chai.expect(result).to.have.a.property("quantity");
      chai.expect(result).to.have.a.property("value");
    })
  });
});
