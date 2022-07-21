module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    quantity: DataTypes.NUMBER,
    value: DataTypes.DECIMAL(10, 2),
    type: DataTypes.ENUM('buy', 'sell'),
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
      foreignKey: 'asset_id',
      otherKey: 'client_id',
    });
    models.Client.belongsToMany(models.Asset, {
      as: 'assets',
      through: Order,
      foreignKey: 'client_id',
      otherKey: 'asset_id',
    });
  };

  return Order;
};
