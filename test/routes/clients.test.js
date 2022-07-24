const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../../src/server");
const { statusCode } = require("../../src/utils/httpStatus");

chai.use(chaiHttp);

describe('Verifica se a rota `clientes` executa corretamente', () => {
  context("Criação de usuário", () => {
    it('Verifica se ao fazer a requisição para inserir uma nova pessoa cliente, retorna um token', async () => {
  
      const data = {
        name: 'Regex da Silva',
        email: `email+${(Math.random() + 1).toString(36).substring(7)}@gmail.com`,
        password: '234567',
        confirmPassword: '234567',
        cpf: '11111111111',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
        phone: '111111111111',
        address: 'Avenue Regex, 576 NY'
    }
  
      const response = await chai.request(app)
      .post('/clientes')
      .send(data);
      
      chai.expect(response.status).to.be.equal(statusCode.CREATED);
      chai.expect(response.body).to.be.an('object').to.be.have.property('token');
  
    });
  
    it('Verifica se ao fazer a requisição para inserir uma nova pessoa cliente, porém os dados são de um cliente existente, retorna um erro de "Client already exist. Please, try again."', async () => {
  
      const data = {
        name: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        password: '123456',
        confirmPassword: '123456',
        cpf: '11111111111',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
        phone: '111111111111',
        address: 'Avenue Regex, 576 NY'
    }
  
      const response = await chai.request(app)
      .post('/clientes')
      .send(data);
      
      chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
      chai.expect(response.body.message).to.be.eq('Client already exist. Please, try again.');
  
    });

    context("Verifica se ao criar um novo usuário os campos estão corretos", () => {
      it('Name - em branco', async () => {
  
        const data = {
          email: 'lewishamilton@gmail.com',
          password: '123456',
          confirmPassword: '123456',
          cpf: '11111111111',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          phone: '111111111111',
          address: 'Avenue Regex, 576 NY'
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"name" is required');
    
      });

      it('Name - tipo inválido', async () => {
  
        const data = {
          name : 1,
          email: 'lewishamilton@gmail.com',
          password: '123456',
          confirmPassword: '123456',
          cpf: '11111111111',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          phone: '111111111111',
          address: 'Avenue Regex, 576 NY'
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"name" must be a string');
    
      });

      it('Name - tamanho menor que 3', async () => {
  
        const data = {
          name : "ab",
          email: 'lewishamilton@gmail.com',
          password: '123456',
          confirmPassword: '123456',
          cpf: '11111111111',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          phone: '111111111111',
          address: 'Avenue Regex, 576 NY'
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"name" length must be at least 3 characters long');
    
      });

      it('Email - em branco', async () => {
  
        const data = {
          name: 'lewis hamilton',
          password: '123456',
          confirmPassword: '123456',
          cpf: '11111111111',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          phone: '111111111111',
          address: 'Avenue Regex, 576 NY'
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"email" is required');
    
      });

      it('Email - tipo inválido', async () => {
  
        const data = {
          name: 'lewis hamilton',
          email : 1,
          password: '123456',
          confirmPassword: '123456',
          cpf: '11111111111',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          phone: '111111111111',
          address: 'Avenue Regex, 576 NY'
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"email" must be a email');
    
      });

      it('password - em branco', async () => {
  
        const data = {
          name: 'lewis hamilton',
          email: 'lewishamilton@gmail.com',
          confirmPassword: '123456',
          cpf: '11111111111',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          phone: '111111111111',
          address: 'Avenue Regex, 576 NY'
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"password" is required');
    
      });

      it('password - tamanho menor que 6', async () => {
  
        const data = {
          name: 'lewis hamilton',
          email: 'lewishamilton@gmail.com',
          password: '12345',
          confirmPassword: '123456',
          cpf: '11111111111',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          phone: '111111111111',
          address: 'Avenue Regex, 576 NY'
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"password" length must be at least 6 characters long');
    
      });

      it('confirmPassword - em branco', async () => {
  
        const data = {
          name: 'lewis hamilton',
          email: 'lewishamilton@gmail.com',
          password: '123456',
          cpf: '11111111111',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          phone: '111111111111',
          address: 'Avenue Regex, 576 NY'
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"confirmPassword" is required');
    
      });

      it('cpf - em branco', async () => {
  
        const data = {
          name: 'lewis hamilton',
          email: 'lewishamilton@gmail.com',
          password: '123456',
          confirmPassword: '123456',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          phone: '111111111111',
          address: 'Avenue Regex, 576 NY'
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"cpf" is required');
    
      });

      it('cpf - tipo inválido', async () => {
  
        const data = {
          name: 'lewis hamilton',
          email: 'lewishamilton@gmail.com',
          password: '123456',
          cpf: 11111111111,
          confirmPassword: '123456',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          phone: '111111111111',
          address: 'Avenue Regex, 576 NY'
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"cpf" must be a string');
    
      });

      it('cpf - tamanho menor que 11', async () => {
  
        const data = {
          name: 'lewis hamilton',
          email: 'lewishamilton@gmail.com',
          password: '123456',
          cpf: "1111111111",
          confirmPassword: '123456',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          phone: '111111111111',
          address: 'Avenue Regex, 576 NY'
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"cpf" length must be at 11 characters long');
    
      });

      it('image - tipo inválido', async () => {
  
        const data = {
          name: 'lewis hamilton',
          email: 'lewishamilton@gmail.com',
          password: '123456',
          cpf: "11111111111",
          confirmPassword: '123456',
          image: 111,
          phone: '111111111111',
          address: 'Avenue Regex, 576 NY'
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"image" must be a string');
    
      });

      it('phone - em branco', async () => {
  
        const data = {
          name: 'lewis hamilton',
          email: 'lewishamilton@gmail.com',
          password: '123456',
          cpf: "11111111111",
          confirmPassword: '123456',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          address: 'Avenue Regex, 576 NY'
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"phone" is required');
    
      });

      it('phone - tipo inválido', async () => {
  
        const data = {
          name: 'lewis hamilton',
          email: 'lewishamilton@gmail.com',
          password: '123456',
          cpf: "11111111111",
          phone: 111111111111,
          confirmPassword: '123456',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          address: 'Avenue Regex, 576 NY'
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"phone" must be a string');
    
      });

      it('phone - tamanho menor que 12', async () => {
  
        const data = {
          name: 'lewis hamilton',
          email: 'lewishamilton@gmail.com',
          password: '123456',
          cpf: "11111111111",
          phone: "11111111111",
          confirmPassword: '123456',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          address: 'Avenue Regex, 576 NY'
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"phone" length must be at 12 characters long');
    
      });

      it('address - em branco', async () => {
  
        const data = {
          name: 'lewis hamilton',
          email: 'lewishamilton@gmail.com',
          password: '123456',
          cpf: "11111111111",
          phone: '111111111111',
          confirmPassword: '123456',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg'
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"address" is required');
    
      });

      it('address - tipo inválido', async () => {
  
        const data = {
          name: 'lewis hamilton',
          email: 'lewishamilton@gmail.com',
          password: '123456',
          cpf: "11111111111",
          phone: '111111111111',
          confirmPassword: '123456',
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          address : 111
      }
    
        const response = await chai.request(app)
        .post('/clientes')
        .send(data);
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('"address" must be a string');
    
      });
    })
  });

  context("Testes de autenticação com token", () => {
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

    it('Verifica se a rota retorna todas as pessoas clientes', async () => {     
      const response = await chai.request(app)
      .get('/clientes')
      .set({ "Authorization": `Bearer ${token}` })
  
      chai.expect(response.status).to.be.equal(statusCode.OK);
      chai.expect(response.body).to.be.an('array').to.have.length.above(0);
    });
  
    it('Verifica se ao passar um id existente, retorna a pessoa cliente', async () => {    
      const id = 1;
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
  
    it('Verifica se ao passar um id inexistente, retorna um erro', async () => {
      const id = 137;     
      const response = await chai.request(app)
      .get('/clientes/' + id)
      .set({ "Authorization": `Bearer ${token}` })
  
      chai.expect(response.status).to.be.equal(statusCode.NOT_FOUND);
      chai.expect(response.body.message).to.be.eq('Client not found. Please, try again.');  
    });
  });

  context("Exclusão da pessoa usuária", () => {
    context("Autenticados como uma pessoa usuária tipo admin", () => {
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


      it('Verifica se ao passar um id inexistente, retorna um erro', async () => {
        const id = 137;     
        const response = await chai.request(app)
        .delete('/clientes/' + id)
        .set({ "Authorization": `Bearer ${token}` })
    
        chai.expect(response.status).to.be.equal(statusCode.NOT_FOUND);
        chai.expect(response.body.message).to.be.eq('Client not found. Please, try again.');  
      });

      it('Verifica se ao passar um id existente, retorna um sucesso', async () => {
        const getClientsResponse = await chai.request(app)
        .get('/clientes')
        .set({ "Authorization": `Bearer ${token}` })
        
        const clients = getClientsResponse.body
        const client = clients[clients.length - 1];

        
        const response = await chai.request(app)
        .delete('/clientes/' + client.id)
        .set({ "Authorization": `Bearer ${token}` })
        
        chai.expect(response.status).to.be.equal(statusCode.NO_CONTENT); 
      });
    })

    context("Autenticados como uma pessoa usuária comum", () => {
      let token;

      beforeEach(async () => {
        const data = {
          email: 'michaelschumacher@gmail.com',
          password: '123897' 
        }
    
        const loginResponse = await chai.request(app)
        .post('/login')
        .send(data);
    
        token = loginResponse.body.token;
      });

      it('Verifica se ao passar um id inexistente, retorna um erro', async () => {
        const id = 137;     
        const response = await chai.request(app)
        .delete('/clientes/' + id)
        .set({ "Authorization": `Bearer ${token}` })
    
        chai.expect(response.status).to.be.equal(statusCode.NOT_FOUND);
        chai.expect(response.body.message).to.be.eq('Client not found. Please, try again.');  
      });

      it('Verifica se ao passar um id existente, porém não é ele mesmo, retorna um erro', async () => {
        const getClientsResponse = await chai.request(app)
        .get('/clientes')
        .set({ "Authorization": `Bearer ${token}` })
        
        const clients = getClientsResponse.body
        const client = clients[clients.length - 1];

        
        const response = await chai.request(app)
        .delete('/clientes/' + client.id)
        .set({ "Authorization": `Bearer ${token}` })
        
        chai.expect(response.status).to.be.equal(statusCode.BAD_REQUEST);
        chai.expect(response.body.message).to.be.eq('Not authorized to delete this client. Only admins or the same client can delete itself.');  
      });

      it('Verifica se ao passar o id da própria pessoa usuária, retorna um sucesso', async () => {
        //Get the last client criated on database
        const getClientsResponse = await chai.request(app)
        .get('/clientes')
        .set({ "Authorization": `Bearer ${token}` })
        
        const clients = getClientsResponse.body
        const client = clients[clients.length - 1];

        //Login with this client
        const lastClientData = {
          email: client.email,
          password: '234567' 
        }
    
        const lastClientloginResponse = await chai.request(app)
        .post('/login')
        .send(lastClientData);
    
        let lestClientToken = lastClientloginResponse.body.token;
       
        const response = await chai.request(app)
        .delete('/clientes/' + client.id)
        .set({ "Authorization": `Bearer ${lestClientToken}` })
        
        chai.expect(response.status).to.be.equal(statusCode.NO_CONTENT); 
      });
    })

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
});