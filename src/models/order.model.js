
var dbConn_sql = require('./../../config/db_sql.config');
var grubhub_id = 2;
var uber_eats_id = 1;
var Order = function (order) {
    this.order_id = order.order_id;
    this.sub_total = order.sub_total;
    this.tax = order.tax;
    this.total = order.total;
    this.Branch_id = order.Branch_id;
  this.platform_id = order.platform_id;
  this.customer_id = order.customer_id;
};

Order.create_grubhub_order = async function (grubhub_order, result) {
  await dbConn_sql.query('INSERT  IGNORE into `order` (order_id,sub_total,tax,total,Branch_id,platform_id,customer_id) VALUES (?,?,?,?,?,?,?) ', grubhub_order, function (err, rows) {
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
Order.create_uber_order=async function (uber_order, result) {
    await dbConn_sql.query('INSERT  IGNORE into `order` (order_id,sub_total,tax,total,Branch_id,platform_id,customer_id) VALUES (?,?,?,?,?,?,?) ', uber_order, function (err, rows) {
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
  Order.create_uber_order=async function (uber_order, result) {
    await dbConn_sql.query('INSERT  IGNORE into `order` (order_id,sub_total,tax,total,Branch_id,platform_id,customer_id) VALUES (?,?,?,?,?,?,?) ', uber_order, function (err, rows) {
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
  Order.get_grubhub_order=async function (id, result) {
    await dbConn_sql.query( 'Select * from `order` where platform_id= ?',id, function (err, rows) {
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
  Order.get_uber_eats_order1=async function (id, result) {
    await dbConn_sql.query( 'Select * from `order` where platform_id= ?',id, function (err, rows) {
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

module.exports = Order;