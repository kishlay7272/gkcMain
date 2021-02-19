
var dbConn_sqlg = require('./../../config/db_sql1.config');

var Order_data = function (order_details) {
    this.id = order_details.id;
    this.attributes = order_details.attributes;};

Order_data.create_grubhub_order = async function (grubhub_order_data, result) {
  await dbConn_sqlg.query('INSERT IGNORE into order_details(id,attributes) VALUES (?,?) ', grubhub_order_data, function (err, rows) {
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
module.exports = Order_data;