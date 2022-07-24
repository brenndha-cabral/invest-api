const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../../src/server");
const { statusCode } = require("../../src/utils/httpStatus");

chai.use(chaiHttp);

describe('Verifica se a rota `conta/:id` executa corretamente', () => {
  const id = 1;
  context("Testes de autenticação com token", () => {
   it('Verifica se é possível fazer a requisição, sem um token', async () => {

     
     const response = await chai.request(app)
     .get('/conta/' + id)
     .set('Authorization', '');
 
     chai.expect(response.status).to.be.equal(statusCode.UNAUTHORIZED);
     chai.expect(response.body.message).to.be.eq('Token not found');
   });
 
   it('Verifica se é possível fazer a requisição, com um token inválido', async () => {
 
     let token = 'toke_não_valido'
     
      
     const response = await chai.request(app)
     .get('/conta/' + id)
     .set({ "Authorization": `Bearer ${token}` })
 
     chai.expect(response.status).to.be.equal(statusCode.UNAUTHORIZED);
     chai.expect(response.body.message).to.be.eq('Token invalid');
   });

 });

 context("Testes após autenticação correta", () => {

   let token;

   beforeEach(async () => {
     const data = {
       email: 'lewishamilton@gmail.com',
       password: '123456' 
     }
 
     const loginResponse = await chai.request(app)
     .post('/login')
     .send(data);
 
     token = loginResponse.body.token;
   });

   it('Verifica se é possível verificar o saldo da pessoa cliente', async () => {  
       
    const response = await chai.request(app)
    .get('/conta/' + id)
     .set({ "Authorization": `Bearer ${token}` })

     chai.expect(response.status).to.be.equal(statusCode.OK);
     chai.expect(response.body).to.be.an('object').to.have.property('codCliente');
     chai.expect(response.body).to.be.an('object').to.have.property('saldo');
   });

   it('Verifica se é possível verificar o saldo da pessoa cliente com id inexistente', async () => {  
    const unexpectedId = 999999;
    const response = await chai.request(app)
    .get('/conta/' + unexpectedId)
     .set({ "Authorization": `Bearer ${token}` })

     chai.expect(response.status).to.be.equal(statusCode.NOT_FOUND);
     chai.expect(response.body.message).to.be.eq('Balance not found. Please, try again.');
   });
 })
});


describe('Verifica se a rota `conta/deposito` executa corretamente', () => {
  context("Testes de autenticação com token", () => {
   it('Verifica se é possível fazer a requisição, sem um token', async () => {

     
     const response = await chai.request(app)
     .post('/conta/deposito')
     .set('Authorization', '');
 
     chai.expect(response.status).to.be.equal(statusCode.UNAUTHORIZED);
     chai.expect(response.body.message).to.be.eq('Token not found');
   });
 
   it('Verifica se é possível fazer a requisição, com um token inválido', async () => {
 
     let token = 'toke_não_valido'
     
      
     const response = await chai.request(app)
     .post('/conta/deposito')
     .set({ "Authorization": `Bearer ${token}` })
 
     chai.expect(response.status).to.be.equal(statusCode.UNAUTHORIZED);
     chai.expect(response.body.message).to.be.eq('Token invalid');
   });

 });

 context("Testes após autenticação correta", () => {

   let token;

   beforeEach(async () => {
     const data = {
       email: 'lewishamilton@gmail.com',
       password: '123456' 
     }
 
     const loginResponse = await chai.request(app)
     .post('/login')
     .send(data);
 
     token = loginResponse.body.token;
   });

   it('Verifica se é possível depositar sem especificar a pessoa cliente', async () => {  

    const data = {
      "valor": 1000
    }
       
    const response = await chai.request(app)
    .post('/conta/deposito')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)

     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('"codCliente" is required.');
   });

   it('Verifica se é possível depositar especificando a pessoa cliente de forma incorreta', async () => {  

    const data = {
      "codCliente": "a",
      "valor": 1000
    }
       
    const response = await chai.request(app)
    .post('/conta/deposito')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)

     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('"codCliente" must be a number.');
   });

   it('Verifica se é possível depositar especificando a pessoa cliente não cadastrada', async () => {  

    const data = {
      "codCliente": 999999,
      "valor": 1000
    }
       
    const response = await chai.request(app)
    .post('/conta/deposito')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)

     chai.expect(response.status).to.be.equal(statusCode.NOT_FOUND);
      chai.expect(response.body.message).to.be.eq('Client not found. Please, try again.');
   });


   it('Verifica se é possível depositar sem especificar o valor', async () => {  

    const data = {
      codCliente: 1,
    }
       
    const response = await chai.request(app)
    .post('/conta/deposito')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)

     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('"valor" is required.');
   });

   it('Verifica se é possível depositar especificando o valor de forma incorreta', async () => {  

    const data = {
      "codCliente": 1,
      "valor": "a"
    }
       
    const response = await chai.request(app)
    .post('/conta/deposito')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)

     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('"valor" must be a number.');
   });

   it('Verifica se é possível depositar especificando o valor zero ou negativo', async () => {  

    const data = {
      "codCliente": 1,
      "valor": 0
    }
       
    const response = await chai.request(app)
    .post('/conta/deposito')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)

     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('Value must be greater then zero. Please, try again.');
   });

   it('Verifica se é possível depositar valor na conta da pessoa cliente corretamente', async () => {  

    const data = {
      "codCliente": 1,
      "valor": 1
    }
       
    const response = await chai.request(app)
    .post('/conta/deposito')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)

     chai.expect(response.status).to.be.equal(statusCode.CREATED);
      chai.expect(response.body.message).to.be.eq('Balance updated successfully.');
   });
 })
});

describe('Verifica se a rota `conta/saque` executa corretamente', () => {
  context("Testes de autenticação com token", () => {
   it('Verifica se é possível fazer a requisição, sem um token', async () => {

     
     const response = await chai.request(app)
     .post('/conta/saque')
     .set('Authorization', '');
 
     chai.expect(response.status).to.be.equal(statusCode.UNAUTHORIZED);
     chai.expect(response.body.message).to.be.eq('Token not found');
   });
 
   it('Verifica se é possível fazer a requisição, com um token inválido', async () => {
 
     let token = 'toke_não_valido'
     
      
     const response = await chai.request(app)
     .post('/conta/saque')
     .set({ "Authorization": `Bearer ${token}` })
 
     chai.expect(response.status).to.be.equal(statusCode.UNAUTHORIZED);
     chai.expect(response.body.message).to.be.eq('Token invalid');
   });

 });

 context("Testes após autenticação correta", () => {

   let token;

   beforeEach(async () => {
     const data = {
       email: 'lewishamilton@gmail.com',
       password: '123456' 
     }
 
     const loginResponse = await chai.request(app)
     .post('/login')
     .send(data);
 
     token = loginResponse.body.token;
   });

   it('Verifica se é possível sacar sem especificar a pessoa cliente', async () => {  

    const data = {
      "valor": 1000
    }
       
    const response = await chai.request(app)
    .post('/conta/saque')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)

     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('"codCliente" is required.');
   });

   it('Verifica se é possível sacar especificando a pessoa cliente de forma incorreta', async () => {  

    const data = {
      "codCliente": "a",
      "valor": 1000
    }
       
    const response = await chai.request(app)
    .post('/conta/saque')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)

     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('"codCliente" must be a number.');
   });

   it('Verifica se é possível sacar especificando a pessoa cliente não cadastrada', async () => {  

    const data = {
      "codCliente": 999999,
      "valor": 1000
    }
       
    const response = await chai.request(app)
    .post('/conta/saque')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)

     chai.expect(response.status).to.be.equal(statusCode.NOT_FOUND);
      chai.expect(response.body.message).to.be.eq('Client not found. Please, try again.');
   });


   it('Verifica se é possível sacar sem especificar o valor', async () => {  

    const data = {
      codCliente: 1,
    }
       
    const response = await chai.request(app)
    .post('/conta/saque')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)

     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('"valor" is required.');
   });

   it('Verifica se é possível sacar especificando o valor de forma incorreta', async () => {  

    const data = {
      "codCliente": 1,
      "valor": "a"
    }
       
    const response = await chai.request(app)
    .post('/conta/saque')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)

     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('"valor" must be a number.');
   });

   it('Verifica se é possível sacar especificando o valor zero ou negativo', async () => {  

    const data = {
      "codCliente": 1,
      "valor": 0
    }
       
    const response = await chai.request(app)
    .post('/conta/saque')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)

     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('Value must be greater then zero and available in balance. Please, try again.');
   });

   it('Verifica se é possível sacar valor na conta da pessoa cliente', async () => {  

    const data = {
      "codCliente": 1,
      "valor": 1
    }
       
    const response = await chai.request(app)
    .post('/conta/saque')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)

     chai.expect(response.status).to.be.equal(statusCode.CREATED);
      chai.expect(response.body.message).to.be.eq('Balance updated successfully.');
   });
 })
});