
var dbConn_sql = require('./../../config/db_sql.config');
var grubhub_id = 2;
var uber_eats_id = 1;
var Item = function (item) {
    this.item_id = item.item_id;
    this.item_name = item.item_name;
    this.price = item.price;
    this.quantity = item.quantity;
    this.order_id = item.order_id;
};

Item.create_grubhub_item = async function (grubhub_item, result) {
  await dbConn_sql.query('INSERT IGNORE into item(item_id,item_name,price,quantity,order_id) VALUES (?,?,?,?,?) ', grubhub_item, function (err, rows) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log(rows);
      result(null, rows.insertId);
    }
  });
};
Item.create_uber_item=async function (uber_item_values, result) {
    await dbConn_sql.query('INSERT IGNORE into item(item_id,item_name,price,quantity,order_id)  VALUES (?,?,?,?,?) ', uber_item_values, function (err, rows) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        console.log(rows);
        result(null, rows.insertId);
      }
    });
  };
  Item.get_items=async function (orderid, result) {
    await dbConn_sql.query('select * from `item` where order_id=? ', orderid, function (err, rows) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        console.log(rows);
        result(null, rows);
      }
    });
  };
module.exports = Item;