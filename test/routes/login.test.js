const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../../src/server");
const { statusCode } = require("../../src/utils/httpStatus");

chai.use(chaiHttp);

describe('Verifica se a rota `login` executa corretamente', () => {
  it('Verifica se faz o login feito corretamente retorna um token', async () => {
    const data = {
      email: 'lewishamilton@gmail.com',
      password: '123456' 
    }

    const response = await chai.request(app)
    .post('/login')
    .send(data);

    chai.expect(response.status).to.be.equal(statusCode.OK);
    chai.expect(response.body).to.be.an('object').to.be.have.property('token');
  });

  it('Verifica se a pessoa não passa um email válido, retorna um erro com a mensagem `Invalid email. Please enter a valid email address.`', async () => {
    const data = {
      password: '123456' 
    }

    const response = await chai.request(app)
    .post('/login')
    .send(data);

    chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
    chai.expect(response.body.message).to.be.eq('Invalid email. Please enter a valid email address.');
  });

  it('Verifica se a pessoa não passe uma senha válida, retorna um erro com a mensagem retorna a mensagem `The password must be at least 6 digits long. Please enter a valid password.`', async () => {
    const data = {
      email: 'lewishamilton@gmail.com',
      password: '123'
    }

    const response = await chai.request(app)
    .post('/login')
    .send(data);

    console.log(response.body.message)

    chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
    chai.expect(response.body.message).to.be.eq('The password must be at least 6 digits long. Please enter a valid password.');
  });

  it('Verifica se a pessoa não é cliente, retorna um erro com a mensagem `Invalid credentials. Please, try again.`', async () => {
    const data = {
      email: 'regexdasilva@gmail.com',
      password: '123488856' 
    }

    const response = await chai.request(app)
    .post('/login')
    .send(data);

    chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
    chai.expect(response.body.message).to.be.eq('Invalid credentials. Please, try again.');
  });
});
