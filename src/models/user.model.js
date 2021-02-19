
const { unsubscribe } = require('../routes/routes');
var dbConn_sql = require('./../../config/db_sql.config');
var User = function (user) {
  this.Email = user.email;
  this.Phone = user.Phone;
  this.password = user.password;
  this.token = user.token;
};

User.update_token = async function (token, result) {
  await dbConn_sql.query('UPDATE user SET token=?  where (Email=? and password="kishlay")', token, function (err, rows) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log(rows);
      result(null, rows.changedRows);
    }
  });
};
User.login = async function (auth_details, result) {
  await dbConn_sql.query('select * from `user` where (Email=? and password=?)', [auth_details.email, auth_details.password], async function (err, rows) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      // await dbConn_sql.query('UPDATE user SET token=?  where (Email=? and password=?)', [auth_details.token1,auth_details.email,auth_details.password], function (err, rows) {
      //     if (err) {
      //       console.log("error: ", err);
      //       result(err, null);
      //     }
      //     else {
      //       console.log(auth_details.token1);
      //       console.log(rows);
      //       result(null, rows.changedRows);
      //     }
      //   });
      result(null, rows.affectedRows);
    }
  });
}
User.update_token = async function (token, result) {
  await dbConn_sql.query('UPDATE user SET token=?  where (Email=? and password="kishlay")', token, function (err, rows) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log(rows);
      result(null, rows.changedRows);
    }
  });
};

module.exports = User;