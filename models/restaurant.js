const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('restaurant', {
    Restaurant_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    Restaurant_name: {
      type: DataTypes.STRING(25),
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
    status: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'restaurant',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Restaurant_id" },
        ]
      },
    ]
  });
};
