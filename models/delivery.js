const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('delivery', {
    Delivery_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    Picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    license_plate: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    vehicle_model: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    make: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    est_pickup: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    est_delivery: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    order_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'order',
        key: 'order_id'
      }
    }
  }, {
    sequelize,
    tableName: 'delivery',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Delivery_id" },
        ]
      },
      {
        name: "fk_Delivery_order1_idx",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
};
