module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    quantity: DataTypes.NUMBER,
    value: DataTypes.DECIMAL(10, 2),
    created: DataTypes.DATE,
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'Orders',
  });

  Order.associate = (models) => {
    models.Asset.belongsToMany(models.Client, {
      as: 'clients',
      through: Order,
      foreignKey: 'clientId',
      otherKey: 'assetId',
    });
    models.Client.belongsToMany(models.Asset, {
      as: 'assets',
      through: Order,
      foreignKey: 'assetId',
      otherKey: 'clientId',
    });
  };

  return Order;
};
