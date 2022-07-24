module.exports = (sequelize, DataTypes) => {
  const AccountOperation = sequelize.define('AccountOperation', {
    clientId: DataTypes.NUMBER,
    amount: DataTypes.DECIMAL(10, 2),
    type: DataTypes.ENUM('deposit', 'withdraw'),
    created: DataTypes.DATE,
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'AccountOperations',
  });

  return AccountOperation;
};
