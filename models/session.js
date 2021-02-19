const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('session', {
    sid: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    cid: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    token: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    token_valid_from: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    token_valid_to: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sid_valid_from: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sid_valid_to: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cid_valid_to: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cid_valid_from: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    platform_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'branch_platform',
        key: 'platform_id'
      }
    },
    Branch_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'branch_platform',
        key: 'Branch_id'
      }
    },
    cookie: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'session',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Branch_id" },
          { name: "platform_id" },
        ]
      },
      {
        name: "fk_session_branch_platform1_idx",
        using: "BTREE",
        fields: [
          { name: "platform_id" },
          { name: "Branch_id" },
        ]
      },
    ]
  });
};
