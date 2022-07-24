module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'AccountOperations',
      [{
        client_id: 1,
        amount: 1200.00,
        type: 'deposit',
        created: new Date('2021-07-01T19:58:00.000Z'),
      },
      {
        client_id: 2,
        amount: 3070.00,
        type: 'deposit',
        created: new Date('2021-07-01T19:58:00.000Z'),
      }],
      { timestamps: false },
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('AccountOperations', null, {});
  },
};
