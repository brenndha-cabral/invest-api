const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const sinonChai = require('sinon-chai');
const { makeMockModels } = require('sequelize-test-helpers');
const JWT = require('../../src/utils/jwt');

chai.use(sinonChai)


describe('Verifica se Login service executa corretamente.', () => {

  const Client = { findOne: sinon.stub() }
  const mockModels = makeMockModels({ Client })
    
  const { loginService } = proxyquire('../../src/services/loginService', {
      '../../src/database/models': mockModels });
  
  const data = {
    email: 'lewishamilton@gmail.com',
    password: '123456',
  };

   let result;

  context('Verifica quando o cliente não existe', () => {
    before(async () => {
      Client.findOne.resolves(undefined);

      result = await loginService(data.email, data.password)
    })

    after(sinon.resetHistory);

    it('Chama a função que verifica se o cliente existe', () => {
      chai.expect(Client.findOne).to.have.been.calledWith(sinon.match({ where: { email: data.email, password: data.password } }))
    });

    it('Retorna null caso o cliente não exista', () => {
      chai.expect(result).to.be.null
    });
  });

  context('Verifica quando o cliente existe', () => {

    before(async () => {

      Client.findOne.resolves(data);

      result = await loginService(data.email, data.password)

    });

    after(() => {
      sinon.resetHistory
    });

    it('Chama a função que verifica se o cliente existe', () => {
      chai.expect(Client.findOne).to.have.been.calledWith(sinon.match({ where: { email: data.email, password: data.password } }))
    })

    it('Verifica se quando o cliente existe retorna um objeto com a chave token', () => {
      chai.expect(result).to.be.an("object");
      chai.expect(result).to.have.a.property("token");
    })
  });
});
