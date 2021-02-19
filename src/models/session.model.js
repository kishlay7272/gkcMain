
var dbConn_sql = require('./../../config/db_sql.config');
var grubhub_id = 2;
var uber_eats_id = 1;
var grubhub_timestamp_update=2220052;
var Session = function (session) {
  this.sid = session.sid;
  this.cid = session.cid;
  this.token = session.token;
  this.token_valid_from = session.token_valid_from;
  this.token_valid_to = session.token_valid_to;
  this.sid_valid_from = session.sid_valid_from;
  this.sid_valid_to = session.sid_valid_to;
  this.cid_valid_from = session.cid_valid_from;
  this.cid_valid_to = session.cid_valid_to;
  this.platform_id = session.platform_id;
  this.platform_id = session.platform_id;
  this.Branch_id = session.Branch_id;
};

Session.create_grubhub_authentication = async function (grubhub_authentication, result) {
  await dbConn_sql.query('INSERT IGNORE INTO `SESSION` (token,token_valid_from,token_valid_to,platform_id,Branch_id) VALUES (?,?,?,?,?) ', grubhub_authentication, function (err, rows) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
        console.log("Number of records inserted: " + rows.affectedRows);
        result(null, rows.insertId);
    }
  });
};
Session.get_grubhub_timestamp_for_updation = async function (grubhub_timestamp_update, result) {
    await dbConn_sql.query('SELECT token_valid_to FROM session where Branch_id=? ', grubhub_timestamp_update, function (err, rows) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
          console.log("Number of records inserted: " + rows.affectedRows);
          result(null, rows);
      }
    });
  };
  Session.get_grubhub_timestamp_for_url = async function (grubhub_Branch_id, result) {
    await dbConn_sql.query('SELECT token_valid_from FROM session where Branch_id=? ', grubhub_Branch_id, function (err, rows) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
          console.log("Number of records inserted: " + rows.affectedRows);
          result(null, rows);
      }
    });
  };


  Session.update_grubhub_authentication = async function (updated_grubhub_auth, result) {
    await dbConn_sql.query('UPDATE session SET token = ?, token_valid_from =?,token_valid_to =?  WHERE Branch_id=? ', updated_grubhub_auth, function (err, rows) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
          console.log("Number of records inserted: " + rows.affectedRows);
          result(null, rows.insertId);
      }
    });
  };
  Session.update_uber_auth=async function (uber_update_auth_details, result) {
    await dbConn_sql.query('UPDATE session SET sid = ?,cid = ?, sid_valid_from =?,sid_valid_to =?,cid_valid_from =?,cid_valid_to =?  WHERE Branch_id=? ', uber_update_auth_details, function (err, rows) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
          console.log("Number of records inserted: " + rows.affectedRows);
          result(null, rows.insertId);
      }
    });
  };
  Session.find_uber_auth=async function (Branch_id, result) {
    await dbConn_sql.query('SELECT sid,cid FROM session where Branch_id=? ', Branch_id, function (err, rows) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
          console.log("Number of records inserted: " + rows.affectedRows);
          result(null, rows);
      }
    });
  };
Session.get_grubhub_timestamp_for_updation(grubhub_timestamp_update,function(err, branch_details) {
    if (err)
    console.log(err);
    console.log(branch_details);
  });

module.exports = Session;