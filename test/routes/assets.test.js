const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../../src/server");
const { statusCode } = require("../../src/utils/httpStatus");

chai.use(chaiHttp);

describe('Verifica se a rota `ativos` executa corretamente', () => {
  context("Criação de ativo", () => {
    context("Testes de permissão e autenticação", () => {
      it('Verifica se ao fazer a requisição para inserir um novo ativo, sem um token, retorna um erro "Token not found"', async () => {
    
        const data = {
          "name": "Vale",
          "code": "VALE3",
          "quantity": 300,
          "value": "18.50"
        }
    
        const response = await chai.request(app)
        .post('/ativos')
        .set({ "Authorization": '' })
        .send(data);
  
        chai.expect(response.status).to.be.equal(statusCode.UNAUTHORIZED);
        chai.expect(response.body.message).to.be.eq('Token not found');
    
      });

      it('Verifica se ao fazer a requisição para inserir um novo ativo, com um token inválido, retorna um erro "Token invalid"', async () => {

        const token = "TOKEN_NÃO_VÁLIDO"
    
        const data = {
          "name": "Vale",
          "code": "VALE3",
          "quantity": 300,
          "value": "18.50"
        }
    
        const response = await chai.request(app)
        .post('/ativos')
        .set({ "Authorization": `Bearer ${token}` })
        .send(data);
  
        chai.expect(response.status).to.be.equal(statusCode.UNAUTHORIZED);
        chai.expect(response.body.message).to.be.eq('Token invalid');
    
      });

      it('Verifica se ao fazer a requisição para inserir um novo ativo, com uma pessoa usuária não administradora, retorna um erro "Client not authorized to add new asset. Only admins can add new assets."', async () => {

        const userData = {
          email: 'michaelschumacher@gmail.com',
          password: '123897' 
        }
    
        const loginResponse = await chai.request(app)
        .post('/login')
        .send(userData);
    
        let token = loginResponse.body.token;
    
        const data = {
          "name": "Vale",
          "code": "VALE3",
          "quantity": 300,
          "value": "18.50"
        }
    
        const response = await chai.request(app)
        .post('/ativos')
        .set({ "Authorization": `Bearer ${token}` })
        .send(data);

        chai.expect(response.status).to.be.equal(statusCode.UNAUTHORIZED);
        chai.expect(response.body.message).to.be.eq('Client not authorized to add new asset. Only admins can add new assets.');
    
      });
    });

    context("Verifica se ao criar um novo ativo os campos estão corretos", () => {
      let token;
      beforeEach( async () => {
        const userData = {
          email: 'lewishamilton@gmail.com',
          password: '123456' 
        }
    
        const loginResponse = await chai.request(app)
        .post('/login')
        .send(userData);
    
        token = loginResponse.body.token;
      })
      it('name - em branco', async () => {
            
        const data = {
          "code": "VALE3",
          "quantity": 300,
          "value": "18.50"
        }
    
        const response = await chai.request(app)
        .post('/ativos')
        .set({ "Authorization": `Bearer ${token}` })
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"name" is required.');
    
      });

      it('name - tipo inválido', async () => {
            
        const data = {
          name: 123,
          "code": "VALE3",
          "quantity": 300,
          "value": "18.50"
        }
    
        const response = await chai.request(app)
        .post('/ativos')
        .set({ "Authorization": `Bearer ${token}` })
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"name" must be a string.');
    
      });

      it('code - em branco', async () => {
            
        const data = {
          "name": "vale",
          "quantity": 300,
          "value": "18.50"
        }
    
        const response = await chai.request(app)
        .post('/ativos')
        .set({ "Authorization": `Bearer ${token}` })
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"code" is required.');
    
      });

      it('code - tipo inválido', async () => {
            
        const data = {
          "name": "vale",
          code: 123,
          "quantity": 300,
          "value": "18.50"
        }
    
        const response = await chai.request(app)
        .post('/ativos')
        .set({ "Authorization": `Bearer ${token}` })
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"code" must be a string.');
    
      });

      it('quantity - em branco', async () => {
            
        const data = {
          "name": "vale",
          "code": "VALE3",
          "value": "18.50"
        }
    
        const response = await chai.request(app)
        .post('/ativos')
        .set({ "Authorization": `Bearer ${token}` })
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"quantity" is required.');
    
      });

      it('quantity - tipo inválido', async () => {
            
        const data = {
          "name": "vale",
          code: "VALE3",
          "quantity": "aaa",
          "value": "18.50"
        }
    
        const response = await chai.request(app)
        .post('/ativos')
        .set({ "Authorization": `Bearer ${token}` })
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"quantity" must be a number.');
    
      });

      it('value - em branco', async () => {
            
        const data = {
          "name": "vale",
          "code": "VALE3",
          "quantity": "100"
        }
    
        const response = await chai.request(app)
        .post('/ativos')
        .set({ "Authorization": `Bearer ${token}` })
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"value" is required.');
    
      });

      it('value - tipo inválido', async () => {
            
        const data = {
          "name": "vale",
          code: "VALE3",
          "quantity": 100,
          "value": "aaa"
        }
    
        const response = await chai.request(app)
        .post('/ativos')
        .set({ "Authorization": `Bearer ${token}` })
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"value" must be a number.');
    
      });
    });
  
    it('Verifica se ao fazer a requisição para inserir um novo ativo, porém os dados são de um ativo existente, retorna um erro de "Asset already registered"', async () => {
  
      const userData = {
        email: 'lewishamilton@gmail.com',
        password: '123456' 
      }
  
      const loginResponse = await chai.request(app)
      .post('/login')
      .send(userData);
  
      let token = loginResponse.body.token;
  
      const data = {
        "name": "Vale",
        "code": "VALE3",
        "quantity": 300,
        "value": "18.50"
      }
  
      const response = await chai.request(app)
      .post('/ativos')
      .set({ "Authorization": `Bearer ${token}` })
      .send(data);
      
      chai.expect(response.status).to.be.equal(statusCode.CONFLICT);
      chai.expect(response.body.message).to.be.eq('Asset already registered');
  
    });

    it('Verifica se ao fazer a requisição para inserir um novo ativo, retorna uma mensagem de sucesso "Asset created successfully"', async () => {
  
      const userData = {
        email: 'lewishamilton@gmail.com',
        password: '123456' 
      }
  
      const loginResponse = await chai.request(app)
      .post('/login')
      .send(userData);
  
      let token = loginResponse.body.token;
  
      const data = {
        "name": "Vale",
        "code": `VALE+${(Math.random() + 1).toString(36).substring(7)}`,
        "quantity": 300,
        "value": "18.50"
      }
  
      const response = await chai.request(app)
      .post('/ativos')
      .set({ "Authorization": `Bearer ${token}` })
      .send(data);
      
      chai.expect(response.status).to.be.equal(statusCode.CREATED);
      chai.expect(response.body.message).to.be.eq('Asset created successfully');
  
    });
  });

  context("Testes de autenticação com token", () => {
    it('Verifica se é possível fazer a requisição sem um token', async () => {
  
      const response = await chai.request(app)
      .get('/ativos')
      .set('Authorization', '');
  
      chai.expect(response.status).to.be.equal(statusCode.UNAUTHORIZED);
      chai.expect(response.body.message).to.be.eq('Token not found');
    });
  
    it('Verifica se é possível fazer a requisição com um token inválido', async () => {
  
      let token = 'toke_não_valido'
      
      const response = await chai.request(app)
      .get('/ativos')
      .set({ "Authorization": `Bearer ${token}` })
  
      chai.expect(response.status).to.be.equal(statusCode.UNAUTHORIZED);
      chai.expect(response.body.message).to.be.eq('Token invalid');
    });


    it('Verifica se ao passar um id de uma pessoa cliente, retorna um erro de "Token not found", caso não seja passado o token', async () => {    
      const id = 1;
      const response = await chai.request(app)
      .get('/ativos/clientes/' + id)
      .set({ "Authorization": ''})

      chai.expect(response.status).to.be.equal(statusCode.UNAUTHORIZED);
      chai.expect(response.body.message).to.be.eq('Token not found');
  
    });

    it('Verifica se ao passar um id de uma pessoa cliente, retorna um erro de "Token invalid", caso não seja passado o token', async () => {    
      const id = 1;
      let token = 'toke_não_valido'
      const response = await chai.request(app)
      .get('/ativos/clientes/' + id)
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

    it('Verifica se a rota retorna todas os ativos cadastrados', async () => {     
      const response = await chai.request(app)
      .get('/ativos')
      .set({ "Authorization": `Bearer ${token}` })
  
      chai.expect(response.status).to.be.equal(statusCode.OK);
      chai.expect(response.body).to.be.an('array').to.have.length.above(0);
    });

    // Para o correto funcionamento deste teste, a tabela de ativos deve estar vazia
    // it('Verifica se a rota retorna um erro, caso não tenha nenhum ativo cadastrado', async () => {     
    //   const response = await chai.request(app)
    //   .get('/ativos')
    //   .set({ "Authorization": `Bearer ${token}` })
  
    //   chai.expect(response.status).to.be.equal(statusCode.NOT_FOUND);
    //   chai.expect(response.body.message).to.be.eq('Assets not found');
    // });
  
    it('Verifica se ao passar um id existente, retorna o ativo', async () => {    
      const id = 1;
      const response = await chai.request(app)
      .get('/ativos/' + id)
      .set({ "Authorization": `Bearer ${token}` })

      chai.expect(response.status).to.be.equal(statusCode.OK);
      chai.expect(response.body).to.be.an('object');
      chai.expect(response.body).to.be.have.property('codAtivo').eq(1);
      chai.expect(response.body).to.be.have.property('qtdeAtivo');
      chai.expect(response.body).to.be.have.property('valor');
  
    });
  
    it('Verifica se ao passar um id inexistente, retorna um erro de "Asset not found"', async () => {
      const id = 5000;     
      const response = await chai.request(app)
      .get('/ativos/' + id)
      .set({ "Authorization": `Bearer ${token}` })
  
      chai.expect(response.status).to.be.equal(statusCode.NOT_FOUND);
      chai.expect(response.body.message).to.be.eq('Asset not found. Please, try again.');  
    });


    it('Verifica se ao passar um id de pessoa usuária, retorna a sua carteira de ativos', async () => {    
      const id = 1;
      const response = await chai.request(app)
      .get('/ativos/clientes/' + id)
      .set({ "Authorization": `Bearer ${token}` })

      chai.expect(response.status).to.be.equal(statusCode.OK);
      chai.expect(response.body).to.be.an('object');
      chai.expect(response.body).to.be.have.property('codClient').eq(1);
      chai.expect(response.body).to.be.have.property('wallet');
  
    });
  })
});