const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('platforms', {
    platform_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    platform_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'platforms',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "platform_id" },
        ]
      },
    ]
  });
};
