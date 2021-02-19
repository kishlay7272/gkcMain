var DataTypes = require("sequelize").DataTypes;
var _branch = require("./branch");
var _branch_platform = require("./branch_platform");
var _customer = require("./customer");
var _delivery = require("./delivery");
var _item = require("./item");
var _order = require("./order");
var _platforms = require("./platforms");
var _restaurant = require("./restaurant");
var _session = require("./session");
var _user = require("./user");

function initModels(sequelize) {
  var branch = _branch(sequelize, DataTypes);
  var branch_platform = _branch_platform(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);
  var delivery = _delivery(sequelize, DataTypes);
  var item = _item(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var platforms = _platforms(sequelize, DataTypes);
  var restaurant = _restaurant(sequelize, DataTypes);
  var session = _session(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  branch.belongsToMany(platforms, { through: branch_platform, foreignKey: "Branch_id", otherKey: "platform_id" });
  branch_platform.belongsToMany(branch_platform, { through: session, foreignKey: "Branch_id", otherKey: "platform_id" });
  branch_platform.belongsToMany(branch_platform, { through: session, foreignKey: "platform_id", otherKey: "Branch_id" });
  platforms.belongsToMany(branch, { through: branch_platform, foreignKey: "platform_id", otherKey: "Branch_id" });
  branch_platform.belongsTo(branch, { as: "Branch", foreignKey: "Branch_id"});
  branch.hasMany(branch_platform, { as: "branch_platforms", foreignKey: "Branch_id"});
  order.belongsTo(branch, { as: "Branch", foreignKey: "Branch_id"});
  branch.hasMany(order, { as: "orders", foreignKey: "Branch_id"});
  session.belongsTo(branch_platform, { as: "Branch", foreignKey: "Branch_id"});
  branch_platform.hasMany(session, { as: "sessions", foreignKey: "Branch_id"});
  session.belongsTo(branch_platform, { as: "platform", foreignKey: "platform_id"});
  branch_platform.hasMany(session, { as: "platform_sessions", foreignKey: "platform_id"});
  order.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(order, { as: "orders", foreignKey: "customer_id"});
  delivery.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(delivery, { as: "deliveries", foreignKey: "order_id"});
  item.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(item, { as: "items", foreignKey: "order_id"});
  branch_platform.belongsTo(platforms, { as: "platform", foreignKey: "platform_id"});
  platforms.hasMany(branch_platform, { as: "branch_platforms", foreignKey: "platform_id"});
  order.belongsTo(platforms, { as: "platform", foreignKey: "platform_id"});
  platforms.hasMany(order, { as: "orders", foreignKey: "platform_id"});
  branch.belongsTo(restaurant, { as: "Restaurant", foreignKey: "Restaurant_id"});
  restaurant.hasMany(branch, { as: "branches", foreignKey: "Restaurant_id"});

  return {
    branch,
    branch_platform,
    customer,
    delivery,
    item,
    order,
    platforms,
    restaurant,
    session,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
