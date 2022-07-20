module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'Clients',
      [{
        id: 1,
        name: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        password: '123456',
        cpf: '11111111111',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
        adm: true,
        balance: 1200.00,
        phone: '111111111111',
        address: 'Avenue Regex, 576 NY',
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        id: 2,
        name: 'Michael Schumacher',
        email: 'MichaelSchumacher@gmail.com',
        password: '123456',
        cpf: '22222222222',
        image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
        adm: false,
        balance: 3070.00,
        phone: '222222222222',
        address: 'Avenue Express, 672 NY',
        created: new Date('2021-07-05T19:58:00.000Z'),
      },
      ],
      { timestamps: false },
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Clients', null, {});
  },
};