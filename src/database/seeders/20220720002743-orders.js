module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'Orders',
      [{
        client_id: 2,
        asset_id: 5,
        quantity: 13,
        value: 90.61,
        type: 'buy',
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        client_id: 2,
        asset_id: 5,
        quantity: 8,
        value: 55.76,
        type: 'sell',
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        client_id: 2,
        asset_id: 1,
        quantity: 7,
        value: 129.50,
        type: 'buy',
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        client_id: 1,
        asset_id: 7,
        quantity: 29,
        value: 28.71,
        type: 'buy',
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        client_id: 1,
        asset_id: 3,
        quantity: 10,
        value: 389.70,
        type: 'buy',
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      ],
      { timestamps: false },
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
