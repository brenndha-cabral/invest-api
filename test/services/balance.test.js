const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const sinonChai = require('sinon-chai');
const { makeMockModels } = require('sequelize-test-helpers');

chai.use(sinonChai)


describe('Verifica se Balance service executa corretamente.', () => {

  const Client = { findOne: sinon.stub(), update: sinon.stub() }
  const mockModels = makeMockModels({ Client })
    
  const { balanceUpdateService } = proxyquire('../../src/services/balanceService', {
      '../../src/database/models': mockModels });
  
  const data = {
    id: 1,
    updateBalance: 100.00,
    path: '/deposito',
  };

   let result;

  context('Verifica quando o cliente não existe', () => {
    before(async () => {
      Client.findOne.resolves(undefined);

      result = await balanceUpdateService(data.id, data.value, data.path)
    })

    after(sinon.resetHistory);

    it('Chama a função que verifica se o cliente existe', () => {
      chai.expect(Client.findOne).to.have.been.calledWith(sinon.match({ where: { id: data.id } }))
    });

    it('Retorna null caso o cliente não exista', () => {
      chai.expect(result).to.be.null
    });
  });

  context('Verifica quando o cliente existe', () => {

    before(async () => {

      Client.findOne.resolves(data);

      result = await balanceUpdateService(data.id, data.value, data.path)

    });

    after(() => {
      sinon.resetHistory
    });

    it('Chama a função que verifica se o cliente existe', () => {
      chai.expect(Client.findOne).to.have.been.calledWith(sinon.match({ where: { id: data.id } }))
    })

    it('Chama a função que faz o update no balanço do cliente', () => {
      chai.expect(Client.update).to.have.been.calledWith(sinon.match(
        { balance: data.updateBalance },
        { where: { id: data.id } },
      ))
    })

    it('Verifica se quando o o update é feito corretamente, retorna uma string', () => {
      chai.expect(result).to.be.true;
    })
  });
});
