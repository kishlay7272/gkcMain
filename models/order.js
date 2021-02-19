const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    order_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    sub_total: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tax: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    total: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Branch_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'branch',
        key: 'Branch_id'
      }
    },
    platform_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'platforms',
        key: 'platform_id'
      }
    },
    customer_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'customer',
        key: 'customer_id'
      }
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    order_time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    short_merchant_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    legacy_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ready_time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'order',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_id" },
          { name: "customer_id" },
        ]
      },
      {
        name: "fk_order_Branch1_idx",
        using: "BTREE",
        fields: [
          { name: "Branch_id" },
        ]
      },
      {
        name: "fk_order_platforms1_idx",
        using: "BTREE",
        fields: [
          { name: "platform_id" },
        ]
      },
      {
        name: "fk_order_Customer1_idx",
        using: "BTREE",
        fields: [
          { name: "customer_id" },
        ]
      },
    ]
  });
};
