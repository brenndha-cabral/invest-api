module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'Orders',
      [{
        id: 1,
        client_id: 1,
        asset_id: 10,
        quantity: 3,
        value: 611.67,
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        id: 2,
        client_id: 2,
        asset_id: 5,
        quantity: 13,
        value: 90.61,
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        id: 3,
        client_id: 2,
        asset_id: 1,
        quantity: 7,
        value: 129.50,
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        id: 4,
        client_id: 1,
        asset_id: 7,
        quantity: 29,
        value: 28.71,
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        id: 5,
        client_id: 1,
        asset_id: 3,
        quantity: 10,
        value: 389.70,
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
