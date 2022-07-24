module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AccountOperations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      clientId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'client_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Clients',
          key: 'id',
        },
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('deposit', 'withdraw'),
      },
      created: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('AccountOperations');
  },
};
