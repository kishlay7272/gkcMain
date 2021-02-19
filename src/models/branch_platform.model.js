
var dbConn_sql = require('./../../config/db_sql.config');
var grubhub_id = 2;
var uber_eats_id = 1;
//Branch_platform object creation
var Branch_platform = function (branch_platform) {
  this.platform_id = branch_platform.platform_id;
  this.Branch_id = branch_platform.Branch_id;
  this.email = branch_platform.email;
  this.password = branch_platform.password;
};

Branch_platform.find_grubhub_credentials = async function (grubhub_id, result) {
  await dbConn_sql.query('SELECT * FROM branch_platform where platform_id=? ', grubhub_id, async function (err, rows) {
    if (err) {
      console.log("error: ", err);
     await result(err, null);
    }
    else {
      console.log(rows);
      await result(null, rows);
    }
  });
};
Branch_platform.update_token = async function (token, result) {
  await dbConn_sql.query('UPDATE user SET token=?  where Email="kishlay0606@gmail.com" ', token, function (err, rows) {
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
Branch_platform.find_uber_credentials = async function (uber_id, result) {
  await dbConn_sql.query('SELECT * FROM branch_platform where platform_id=? ', uber_id, function (err, rows) {
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
module.exports = Branch_platform;