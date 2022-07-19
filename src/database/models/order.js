export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    clientId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    assetId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    quantity: DataTypes.NUMBER,
    value: DataTypes.DECIMAL(10, 2),
    created: DataTypes.DATE,
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'Orders',
  });

  Order.associate = (models) => {
    models.Category.belongsTo(models.Client, {
      as: 'clients',
      through: Order,
      foreignKey: 'clientId',
      otherKey: 'assetId',
    });
    models.BlogPost.belongsTo(models.Asset, {
      as: 'assets',
      through: Order,
      foreignKey: 'assetId',
      otherKey: 'clientId',
    });
  };

  return Order;
};
