
var dbConn_sql = require('./../../config/db_sql.config');
var grubhub_id = 2;
var uber_eats_id = 1;
var Customer = function (customer) {
    this.customer_id = Customer.customer_id;
    this.Name = Customer.Name;
    this.Phone = Customer.Phone;
    this.address = Customer.address;
};

Customer.create_grubhub_customer = async function (grubhub_customer, result) {
  await dbConn_sql.query('INSERT IGNORE into customer(customer_id,Name,Phone) VALUES (?,?,?) ', grubhub_customer, function (err, rows) {
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
Customer.get_customer_details = async function (id, result) {
  await dbConn_sql.query('SELECT * from `customer` where customer_id IN (select customer_id from `order` where order_id=?)', id, function (err, rows) {
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
Customer.create_uber_customer=async function (uber_customer_values, result) {
    await dbConn_sql.query('INSERT IGNORE into customer(customer_id,Name,Phone) VALUES (?,?,?) ', uber_customer_values, function (err, rows) {
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

module.exports = Customer;