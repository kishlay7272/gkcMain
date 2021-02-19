const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('branch_platform', {
    platform_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'platforms',
        key: 'platform_id'
      }
    },
    Branch_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'branch',
        key: 'Branch_id'
      }
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    place_uuid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    merchant_uuid: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'branch_platform',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "platform_id" },
          { name: "Branch_id" },
        ]
      },
      {
        name: "fk_platforms_has_Branch_Branch1_idx",
        using: "BTREE",
        fields: [
          { name: "Branch_id" },
        ]
      },
      {
        name: "fk_platforms_has_Branch_platforms1_idx",
        using: "BTREE",
        fields: [
          { name: "platform_id" },
        ]
      },
    ]
  });
};
