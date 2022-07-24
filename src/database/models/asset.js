module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    quantity: DataTypes.NUMBER,
    value: DataTypes.DECIMAL(10, 2),
    created: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'Assets',
  });

  Asset.associate = (models) => {
    Asset.hasMany(models.Order, {
      foreignKey: 'asset_id',
      as: 'orders',
    });
  };

  return Asset;
};
