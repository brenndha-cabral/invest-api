const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../../src/server");
const { statusCode } = require("../../src/utils/httpStatus");

chai.use(chaiHttp);

describe('Verifica se a rota `investimentos/comprar` executa corretamente', () => {
  context("Testes de autenticação com token", () => {
    it('Verifica se é possível fazer a requisição de comprar, sem um token', async () => {
  
      const response = await chai.request(app)
      .post('/investimentos/comprar')
      .set('Authorization', '');
  
      chai.expect(response.status).to.be.equal(statusCode.UNAUTHORIZED);
      chai.expect(response.body.message).to.be.eq('Token not found');
    });
  
    it('Verifica se é possível fazer a requisição de comprar, com um token inválido', async () => {
  
      let token = 'toke_não_valido'
      
      const response = await chai.request(app)
      .get('/investimentos/comprar')
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

    it('Verifica se é possível criar uma ordem de compra de uma pessoa usuária que não existe', async () => {  

      const data = {
        "codCliente": 99999,
        "codAtivo": 6,
        "qtdeAtivo": 12
      }
      
      const response = await chai.request(app)
      .post('/investimentos/comprar')
      .set({ "Authorization": `Bearer ${token}` })
      .send(data)
  
      chai.expect(response.status).to.be.equal(statusCode.NOT_FOUND);
      chai.expect(response.body.message).to.be.eq('Client not found. Please, try again.');
    });

    it('Verifica se é possível criar uma ordem de compra com ativo que não existe', async () => {  

      const data = {
        "codCliente": 1,
        "codAtivo": 999999,
        "qtdeAtivo": 12
      }
      
      const response = await chai.request(app)
      .post('/investimentos/comprar')
      .set({ "Authorization": `Bearer ${token}` })
      .send(data)
  
      chai.expect(response.status).to.be.equal(statusCode.NOT_FOUND);
      chai.expect(response.body.message).to.be.eq('Asset not found. Please, try again.');
    });

    it('Verifica se é possível criar uma ordem de compra com uma quantidade de um ativo maior do que a disponível', async () => {  

      const data = {
        "codCliente": 1,
        "codAtivo": 1,
        "qtdeAtivo": 9999999
      }
      
      const response = await chai.request(app)
      .post('/investimentos/comprar')
      .set({ "Authorization": `Bearer ${token}` })
      .send(data)
  
      chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('Asset quantity must be less or equal the available. Please, try again.');
    });

    it('Verifica se é possível criar uma ordem de compra sem especificar a pessoa cliente', async () => {  

      const data = {
        "codAtivo": 1,
        "qtdeAtivo": 1
      }
      
      const response = await chai.request(app)
      .post('/investimentos/comprar')
      .set({ "Authorization": `Bearer ${token}` })
      .send(data)
  
      chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('"codCliente" is required.');
    });

    it('Verifica se é possível criar uma ordem de compra especificando a pessoa cliente de maneira incorreta', async () => {  

      const data = {
        "codCliente": "a",
        "codAtivo": 1,
        "qtdeAtivo": 1
      }
      
      const response = await chai.request(app)
      .post('/investimentos/comprar')
      .set({ "Authorization": `Bearer ${token}` })
      .send(data)
  
      chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('"codCliente" must be a number.');
    });

    it('Verifica se é possível criar uma ordem de compra sem especificar o ativo', async () => {  

      const data = {
        "codCliente": 1,
        "qtdeAtivo": 1
      }
      
      const response = await chai.request(app)
      .post('/investimentos/comprar')
      .set({ "Authorization": `Bearer ${token}` })
      .send(data)
  
      chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('"codAtivo" is required.');
    });

    it('Verifica se é possível criar uma ordem de compra especificando o ativo de maneira incorreta', async () => {  

      const data = {
        "codCliente": 1,
        "codAtivo": "a",
        "qtdeAtivo": 1
      }
      
      const response = await chai.request(app)
      .post('/investimentos/comprar')
      .set({ "Authorization": `Bearer ${token}` })
      .send(data)
  
      chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('"codAtivo" must be a number.');
    });


    it('Verifica se é possível criar uma ordem de compra sem especificar a quantidade', async () => {  

      const data = {
        "codCliente": 1,
        "codAtivo": 1,
      }
      
      const response = await chai.request(app)
      .post('/investimentos/comprar')
      .set({ "Authorization": `Bearer ${token}` })
      .send(data)
  
      chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('"qtdeAtivo" is required.');
    });

    it('Verifica se é possível criar uma ordem de compra especificando a quantidade de maneira incorreta', async () => {  

      const data = {
        "codCliente": 1,
        "codAtivo": 1,
        "qtdeAtivo": "a"
      }
      
      const response = await chai.request(app)
      .post('/investimentos/comprar')
      .set({ "Authorization": `Bearer ${token}` })
      .send(data)
  
      chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('"qtdeAtivo" must be a number.');
    });

    it('Verifica se é possível criar uma ordem de compra corretamente', async () => {  

      const data = {
        "codCliente": 1,
        "codAtivo": 1,
        "qtdeAtivo": 1
      }
      
      const response = await chai.request(app)
      .post('/investimentos/comprar')
      .set({ "Authorization": `Bearer ${token}` })
      .send(data)
  
      chai.expect(response.status).to.be.equal(statusCode.CREATED);
      chai.expect(response.body.message).to.be.eq('Order created successfully.');
    });
  })
});


describe('Verifica se a rota `investimentos/vender` executa corretamente', () => {
  context("Testes de autenticação com token", () => {
   it('Verifica se é possível fazer a requisição de vender, sem um token', async () => {
 
     const response = await chai.request(app)
     .post('/investimentos/vender')
     .set('Authorization', '');
 
     chai.expect(response.status).to.be.equal(statusCode.UNAUTHORIZED);
     chai.expect(response.body.message).to.be.eq('Token not found');
   });
 
   it('Verifica se é possível fazer a requisição de vender, com um token inválido', async () => {
 
     let token = 'toke_não_valido'
     
     const response = await chai.request(app)
     .get('/investimentos/vender')
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

   it('Verifica se é possível criar uma ordem de venda de uma pessoa usuária que não existe', async () => {  

     const data = {
       "codCliente": 99999,
       "codAtivo": 6,
       "qtdeAtivo": 12
     }
     
     const response = await chai.request(app)
     .post('/investimentos/vender')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)
 
     chai.expect(response.status).to.be.equal(statusCode.NOT_FOUND);
     chai.expect(response.body.message).to.be.eq('Client not found. Please, try again.');
   });

   it('Verifica se é possível criar uma ordem de venda com ativo que não existe', async () => {  

     const data = {
       "codCliente": 1,
       "codAtivo": 999999,
       "qtdeAtivo": 12
     }
     
     const response = await chai.request(app)
     .post('/investimentos/vender')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)
 
     chai.expect(response.status).to.be.equal(statusCode.NOT_FOUND);
     chai.expect(response.body.message).to.be.eq('Asset not found. Please, try again.');
   });

   it('Verifica se é possível criar uma ordem de venda com uma quantidade de um ativo maior do que a disponível', async () => {  

     const data = {
       "codCliente": 1,
       "codAtivo": 1,
       "qtdeAtivo": 9999999
     }
     
     const response = await chai.request(app)
     .post('/investimentos/vender')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)
 
     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
     chai.expect(response.body.message).to.be.eq('Asset quantity must be less or equal the available or client does not have this asset. Please, try again.');
   });

   it('Verifica se é possível criar uma ordem de venda sem especificar a pessoa cliente', async () => {  

     const data = {
       "codAtivo": 1,
       "qtdeAtivo": 1
     }
     
     const response = await chai.request(app)
     .post('/investimentos/vender')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)
 
     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
     chai.expect(response.body.message).to.be.eq('"codCliente" is required.');
   });

   it('Verifica se é possível criar uma ordem de venda especificando a pessoa cliente de maneira incorreta', async () => {  

     const data = {
       "codCliente": "a",
       "codAtivo": 1,
       "qtdeAtivo": 1
     }
     
     const response = await chai.request(app)
     .post('/investimentos/vender')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)
 
     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
     chai.expect(response.body.message).to.be.eq('"codCliente" must be a number.');
   });

   it('Verifica se é possível criar uma ordem de venda sem especificar o ativo', async () => {  

     const data = {
       "codCliente": 1,
       "qtdeAtivo": 1
     }
     
     const response = await chai.request(app)
     .post('/investimentos/vender')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)
 
     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
     chai.expect(response.body.message).to.be.eq('"codAtivo" is required.');
   });

   it('Verifica se é possível criar uma ordem de venda especificando o ativo de maneira incorreta', async () => {  

     const data = {
       "codCliente": 1,
       "codAtivo": "a",
       "qtdeAtivo": 1
     }
     
     const response = await chai.request(app)
     .post('/investimentos/vender')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)
 
     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
     chai.expect(response.body.message).to.be.eq('"codAtivo" must be a number.');
   });


   it('Verifica se é possível criar uma ordem de venda sem especificar a quantidade', async () => {  

     const data = {
       "codCliente": 1,
       "codAtivo": 1,
     }
     
     const response = await chai.request(app)
     .post('/investimentos/vender')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)
 
     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
     chai.expect(response.body.message).to.be.eq('"qtdeAtivo" is required.');
   });

   it('Verifica se é possível criar uma ordem de venda especificando a quantidade de maneira incorreta', async () => {  

     const data = {
       "codCliente": 1,
       "codAtivo": 1,
       "qtdeAtivo": "a"
     }
     
     const response = await chai.request(app)
     .post('/investimentos/vender')
     .set({ "Authorization": `Bearer ${token}` })
     .send(data)
 
     chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
     chai.expect(response.body.message).to.be.eq('"qtdeAtivo" must be a number.');
   });

   it('Verifica se é possível criar uma ordem de venda corretamente', async () => {  

    const data = {
      "codCliente": 1,
      "codAtivo": 1,
      "qtdeAtivo": 1
    }
    
    const response = await chai.request(app)
    .post('/investimentos/vender')
    .set({ "Authorization": `Bearer ${token}` })
    .send(data)

    chai.expect(response.status).to.be.equal(statusCode.CREATED);
    chai.expect(response.body.message).to.be.eq('Order created successfully.');
  });
  })
});