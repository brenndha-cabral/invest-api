module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    cpf: DataTypes.STRING,
    image: DataTypes.STRING,
    adm: DataTypes.BOOLEAN,
    balance: DataTypes.DECIMAL(10, 2),
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    created: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'Clients',
  });

  Client.associate = (models) => {
    Client.hasMany(models.Order, {
      foreignKey: 'client_id',
      as: 'orders',
    });

    Client.hasMany(models.AccountOperation, {
      foreignKey: 'client_id',
      as: 'transactions',
    });
  };

  return Client;
};
