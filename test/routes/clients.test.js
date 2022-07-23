const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../../src/server");
const { statusCode } = require("../../src/utils/httpStatus");

chai.use(chaiHttp);

describe('Verifica se a rota `clientes` executa corretamente', () => {
  it('Verifica se é possível fazer a requisição sem um token', async () => {

    const response = await chai.request(app)
    .get('/clientes')
    .set('Authorization', '');

    chai.expect(response.status).to.be.equal(statusCode.UNAUTHORIZED);
    chai.expect(response.body.message).to.be.eq('Token not found');
  });

  it('Verifica se é possível fazer a requisição com um token inválido', async () => {

    let token = 'toke_não_valido'
    
    const response = await chai.request(app)
    .get('/clientes')
    .set({ "Authorization": `Bearer ${token}` })

    chai.expect(response.status).to.be.equal(statusCode.UNAUTHORIZED);
    chai.expect(response.body.message).to.be.eq('Token invalid');
  });

  it('Verifica se ao fazer a requisição com um token válido, retorna todas as pessoas clientes', async () => {

    let token;

    const data = {
      email: 'lewishamilton@gmail.com',
      password: '123456' 
    }

    const loginResponse = await chai.request(app)
    .post('/login')
    .send(data);

    token = loginResponse.body.token;
    
    const response = await chai.request(app)
    .get('/clientes')
    .set({ "Authorization": `Bearer ${token}` })

    chai.expect(response.status).to.be.equal(statusCode.OK);
    chai.expect(response.body).to.be.an('array').to.have.length.above(0);
  });

  // Para que esse teste comentado seja validado, é necessário que todos os clientes sejam
  // adms no db, para que assim não retorne nenhum cliente mediante as condicionais e cair neste teste. Se ele for validado, o teste acima quebra

  // it('Verifica se ao fazer a requisição com um token válido, retorna um erro caso não haja pessoas clientes', async () => {

  //   let token;

  //   const data = {
  //     email: 'lewishamilton@gmail.com',
  //     password: '123456' 
  //   }

  //   const loginResponse = await chai.request(app)
  //   .post('/login')
  //   .send(data);

  //   token = loginResponse.body.token;
    
  //   const response = await chai.request(app)
  //   .get('/clientes')
  //   .set({ "Authorization": `Bearer ${token}` })

  //   chai.expect(response.status).to.be.equal(statusCode.NOT_FOUND);
  //   chai.expect(response.body.message).to.be.eq('Clients not found. Please, try again.');
  // });

  it('Verifica se ao fazer a requisição com um token válido e ao passar um id existente, retorna a pessoa cliente', async () => {

    let token;
    const id = 1;

    const data = {
      email: 'lewishamilton@gmail.com',
      password: '123456' 
    }

    const loginResponse = await chai.request(app)
    .post('/login')
    .send(data);

    token = loginResponse.body.token;
    
    const response = await chai.request(app)
    .get('/clientes/' + id)
    .set({ "Authorization": `Bearer ${token}` })

    chai.expect(response.status).to.be.equal(statusCode.OK);
    chai.expect(response.body).to.be.an('object');
    chai.expect(response.body).to.be.have.property('id').eq(1);
    chai.expect(response.body).to.be.have.property('name');
    chai.expect(response.body).to.be.have.property('email');
    chai.expect(response.body).to.be.have.property('cpf');
    chai.expect(response.body).to.be.have.property('image');
    chai.expect(response.body).to.be.have.property('adm');
    chai.expect(response.body).to.be.have.property('balance');
    chai.expect(response.body).to.be.have.property('phone');
    chai.expect(response.body).to.be.have.property('address');
    chai.expect(response.body).to.be.have.property('created');

  });

  it('Verifica se ao fazer a requisição com um token válido e ao passar um id inexistente, retorna um erro', async () => {

    let token;
    const id = 137;

    const data = {
      email: 'lewishamilton@gmail.com',
      password: '123456' 
    }

    const loginResponse = await chai.request(app)
    .post('/login')
    .send(data);

    token = loginResponse.body.token;
    
    const response = await chai.request(app)
    .get('/clientes/' + id)
    .set({ "Authorization": `Bearer ${token}` })

    chai.expect(response.status).to.be.equal(statusCode.NOT_FOUND);
    chai.expect(response.body.message).to.be.eq('Client not found. Please, try again.');


  });

  it('Verifica se ao fazer a requisição para inserir uma nova pessoa cliente, retorna um token', async () => {

    const data = {
      name: 'Regex da Silva',
      email: 'regex@gmail.com',
      password: '234567',
      cpf: '11111111111',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
      phone: '111111111111',
      address: 'Avenue Regex, 576 NY'
  }

    const response = await chai.request(app)
    .post('/clients')
    .send(data);

    chai.expect(response.status).to.be.equal(statusCode.CREATED);
    chai.expect(response.body).to.be.an('object').to.be.have.property('token');

  });
});