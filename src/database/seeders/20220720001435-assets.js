module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'Assets',
      [{
        id: 1,
        name: 'Vale',
        code: 'VALE3',
        quantity: 300,
        value: 18.50,
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        id: 2,
        name: 'Natura',
        code: 'NTCO3',
        quantity: 600,
        value: 12.80,
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        id: 3,
        name: 'BB Seguridade',
        code: 'BBSE3',
        quantity: 470,
        value: 38.97,
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        id: 4,
        name: 'Localiza',
        code: 'RENT3',
        quantity: 145,
        value: 98.99,
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        id: 5,
        name: 'Visa',
        code: 'VISA34',
        quantity: 100,
        value: 6.97,
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        id: 6,
        name: 'Alpargatas',
        code: 'ALPA4',
        quantity: 124,
        value: 25.63,
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        id: 7,
        name: 'Klabin',
        code: 'KLBN11',
        quantity: 5,
        value: 0.99,
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        id: 8,
        name: 'Assaí',
        code: 'ASAI3',
        quantity: 27,
        value: 87.42,
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        id: 9,
        name: 'Merck & Co',
        code: 'MRCK34',
        quantity: 47,
        value: 123.41,
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        id: 10,
        name: 'Alphabet',
        code: 'GOGL34',
        quantity: 2345,
        value: 203.89,
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      ],
      { timestamps: false },
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Assets', null, {});
  },
};
