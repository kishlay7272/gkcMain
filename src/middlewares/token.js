require('../../app');
// const dbConn_sql = require('../../config/db_sql.config');
const Order = require('../models/order.model');
const Customer = require('../models/customer.model');
const Item = require('../models/item.model');
const Branch_platform = require('../models/branch_platform.model');
const User = require('../models/user.model');
const axios = require('axios');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
let secret = "he who must not be named";
const dbConn_sql = require('../../config/db_sql.config');

module.exports = {
    createToken: async function (req, res, next) {
        try {
            let userId = req.body.userId
            let email = req.body.email;
            let token = jwt.sign({ id: userId, user_email: req.body.email }, secret);
            const prodsQuery1 = "UPDATE `user` SET token =" + `"${token}"` + " WHERE Email=" + `'${email}'`;

            dbConn_sql.query(prodsQuery1, async function (error, results) {
                console.log(prodsQuery1)
                if (error) {
                    return res.status(500).send(error);
                }
                if (results) {

                    return res.header("auth-token", token).status(400).json(
                        {
                            "status": "200",
                            "message": "logged in",
                            "token": token
                        })
                }
            })
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
}