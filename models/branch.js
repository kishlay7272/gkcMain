const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('branch', {
    Branch_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    Branch_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    contact: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Restaurant_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'restaurant',
        key: 'Restaurant_id'
      }
    }
  }, {
    sequelize,
    tableName: 'branch',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Branch_id" },
          { name: "Restaurant_id" },
        ]
      },
      {
        name: "fk_Branch_Restaurant_idx",
        using: "BTREE",
        fields: [
          { name: "Restaurant_id" },
        ]
      },
    ]
  });
};
