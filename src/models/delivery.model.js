
var dbConn_sql = require('./../../config/db_sql.config');
var grubhub_id = 2;
var uber_eats_id = 1;
var Delivery = function (delivery) {
    this.delivery_person_name= delivery.delivery_person_name;
    this.delivery_person_phone = delivery.delivery_person_phone;
   
};
Delivery.create_grubhub_delivery=async function (delivery_details, result) {
    await dbConn_sql.query('INSERT IGNORE into delivery(Name,mobile,vehicle_model,order_id) VALUES (?,?,?,?,?) ', delivery_details, function (err, rows) {
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


module.exports = Delivery;