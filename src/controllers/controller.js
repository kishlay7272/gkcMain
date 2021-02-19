require('../../app');
const dbConn_sql = require('../../config/db_sql.config');
const Order = require('../models/order.model');
const Customer = require('../models/customer.model');
const Item = require('../models/item.model');
const Branch_platform = require('../models/branch_platform.model');
const User = require('../models/user.model');
const axios = require('axios');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");


module.exports = {
    login: async function (req, res, next) {
        try {
            if (!req.body || !req.body.email || !req.body.email || req.body.email == "undefined" || req.body.password == "undefined") {
                return res.status(400).json(
                    {
                        "status": "400",
                        "error": "missing email and password in body"
                    })
            }
            else if (!req.body.email || req.body.email == "undefined") {
                return res.status(400).json(
                    {
                        "status": "400",
                        "error": "missing email in body"
                    })
            }
            else if (!req.body.password || req.body.password == "undefined") {
                return res.status(400).json(
                    {
                        "status": "400",
                        "error": "missing paassword in body"
                    })
            }
            else {
                let email = req.body.email;

                const prodsQuery1 = "select * from `user` where Email=" + `'${email}'`;

                dbConn_sql.query(prodsQuery1, async function (error, results) {
                    console.log(prodsQuery1)
                    if (error){
                        res.status(500).json(
                            {
                                "error": error
                            }
                        );
                    }
                    else {
                        if (!results.length) {
                            return res.status(400).json(
                                {
                                    "status": "400",
                                    "error": "user does not exist"
                                })
                        }
                        else {
                            let validPassword = await bcrypt.compare(req.body.password, results[0].password);
                            if (!validPassword) {
                                return res.status(400).json(
                                    {
                                        "status": "400",
                                        "error": "user does not exist"
                                    })
                            }
                            if (validPassword) {
                                req.body.userId = results[0].email;
                                next();
                            }
        
                        }

                    }
              

                });
            
        }
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },

    signup: async function (req, res, next) {

        try {
            let salt = await bcrypt.genSalt(10);
            let hasPassword = await bcrypt.hash(req.body.password, salt);
            console.log(hasPassword);
            if (!req.body || !req.body.email  || !req.body.email || req.body.email == "undefined" || req.body.password == "undefined") {
                return res.status(400).json(
                    {
                        "status": "400",
                        "error": "missing email,roleid, password in body"
                    })
            }
            else {
                let salt = await bcrypt.genSalt(10);
                let hasPassword = await bcrypt.hash(req.body.password, salt);
                console.log(hasPassword);

                let email = req.body.email;
                const prodsQuery1 = "select * from `user` where Email=" + `'${email}'`;
                dbConn_sql.query(prodsQuery1, async function (error, results) {
                    console.log(prodsQuery1)
                    if (error)
                        res.status(500).json(
                            {
                                "error": error
                            }
                        );
                    if (!results || results.length == 0) {
                        const prodsQuery = "insert into `user`(Email,`password`) values(" + `'${email}',`  + `'${hasPassword}')`
                        console.log(prodsQuery);
                        dbConn_sql.query(prodsQuery, async function (error, results) {
                            console.log(prodsQuery)
                            if (error)
                                res.status(500).json(
                                    {
                                        "error": error
                                    })
                            if (results) {
                                return res.status(200).json(
                                    {
                                        "status": "200",
                                        "message": "user created successfully"
                                    }
                                );
                            }
                        })
                    }
                    else {
                        return res.status(200).json(
                            {
                                "status": "200",
                                "error": "user already exists"
                            })
                    }
                })
            }
        }
        catch (error) {
            res.status(500).json(
                {
                    "error": error
                })
        }
    },

    confirmUber: async function (req, res, next) {
        try {
            if (!req.query.orderId || (req.query.orderid == "undefined")) {
                return res.status(400).json(
                    {
                        "status": "400",
                        "error": "missing orderid in query params"
                    })
            }
            else {
                let orderId = req.query.orderId;
                const prodsQuery = "select * from `order` join session ON `order`.branch_id=`session`.branch_id where `order`.order_id=" + `"${orderId}"`
                dbConn_sql.query(prodsQuery, async function (error, results) {
                    console.log(prodsQuery)
                    if (error) throw error;
                    if (results) {
                        let uuid=results[0].uuid;
                        let BranchId=results[0].Branch_id;
                        let cookie=results[0].cookie;
                        let data = JSON.stringify({ "preparationTime": 120, "posType": "RD" });
                        let config = {
                            method: 'post',
                            url: 'https://restaurant-dashboard.uber.com/rt/eats/v1/orders/' + `${uuid}` + '/accept',
                            headers: {
                                'authority': 'restaurant-dashboard.uber.com',
                                'pragma': 'no-cache',
                                'cache-control': 'no-cache',
                                'x-uber-device-language': 'en-US',
                                'x-csrf-token': 'x',
                                'x-uber-origin': 'restaurant-dashboard',
                                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
                                'x-uber-source': 'restaurant-dashboard',
                                'content-type': 'application/json',
                                'x-uber-device': 'web',
                                'x-auth-params-uuid': BranchId,
                                'x-uber-breeze-rtapi-token': 'web-token',
                                'accept': '*/*',
                                'origin': 'https://restaurant-dashboard.uber.com',
                                'sec-fetch-site': 'same-origin',
                                'sec-fetch-mode': 'cors',
                                'sec-fetch-dest': 'empty',
                                'referer': 'https://restaurant-dashboard.uber.com/dashboard_v2/orders/all/236ed375-e992-4201-97cf-374a2418565a',
                                'accept-language': 'en-US,en;q=0.9',
                                'cookie':cookie
                            },
                            data: data
                        };
                        console.log(config.url,BranchId,cookie);
                        let response = await axios(config)
                        console.log(JSON.stringify(response.data));
                    }
                })
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },
    readyDoordash: async function (req, res, next) {
        try {
            if (!req.query.orderId || (req.query.orderid == "undefined")) {
                return res.status(400).json(
                    {
                        "status": "400",
                        "error": "missing orderid in query params"
                    })
            }
            else {
                let orderId = req.query.orderId;
                const prodsQuery = "select * from `order` join session ON `order`.branch_id=`session`.branch_id where `order`.order_id=" + `"${orderId}"`
                dbConn_sql.query(prodsQuery, async function (error, results) {
                    console.log(prodsQuery)
                    if (error) throw error;
                    if (results) {
                        let token=results[0].token;
                        let delivery_uuid=results[0].delivery_uuid;
                        var axios = require('axios');
                        var config = {
                          method: 'post',
                          url: 'https://merchant-mobile-bff.doordash.com/v2/confirm_ready_for_pickup/'+`deliveryuuid` +delivery_uuid,
                          headers: { 
                            'Content-Length': '0', 
                            'Host': 'merchant-mobile-bff.doordash.com', 
                            'Connection': 'close', 
                            'Accept-Encoding': 'gzip, deflate', 
                            'User-Agent': 'DoorDashMerchant/2.61.1 (vbox86p; Android 27)', 
                            'Accept': 'application/json', 
                            'Content-Type': 'application/json', 
                            'Accept-Language': 'en-US', 
                            'Version-Name': '2.61.1', 
                            'Authorization': 'JWT '+token, 
                            'X-NewRelic-ID': 'XAUEWF5SGwEJV1ZRDgEE', 
                            'Cookie': 'dd_device_id_2=dx_a80138056180477d91faf475d13923f1; dd_device_id=dx_391c52cf8cea48e599b897eb990490fe; __cfduid=d0097d7c5bc2bd15284c899bfc8ca504b1613043461'
                          }
                        };
                        
                        console.log(config.url)
                        
                        let response = await axios(config)
                        console.log(JSON.stringify(response.data));
                        
                        }
                    });
                }
        } catch (error) {
            res.status(500).send(error);
        }
    },
    readyUber: async function (req, res, next) {
        try {
            if (!req.query.orderId || (req.query.orderid == "undefined")) {
                return res.status(400).json(
                    {
                        "status": "400",
                        "error": "missing orderid in query params"
                    })
            }
            else {
                let orderId = req.query.orderId;
                const prodsQuery = "select * from `order` join session ON `order`.branch_id=`session`.branch_id where `order`.order_id=" + `"${orderId}"`
                dbConn_sql.query(prodsQuery, async function (error, results) {
                    console.log(prodsQuery)
                    if (error) throw error;
                    if (results) {
                        let uuid=results[0].uuid;
                        let BranchId=results[0].Branch_id;
                        let cookie=results[0].cookie;
                        var axios = require('axios');
                        var data = JSON.stringify({"actorUUID":'"'+`${BranchId}`+'"',"entityType":"RESTAURANT"});
                        console.log(data);
                        
                        var config = {
                          method: 'post',
                          url: 'https://restaurant-dashboard.uber.com/rt/eats/v1/orders/'+`${uuid}`+'/ready',
                          headers: { 
                            'authority': 'restaurant-dashboard.uber.com', 
                            'pragma': 'no-cache', 
                            'cache-control': 'no-cache', 
                            'x-uber-device-language': 'en-US', 
                            'x-csrf-token': 'x', 
                            'x-uber-origin': 'restaurant-dashboard', 
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36', 
                            'x-uber-source': 'restaurant-dashboard', 
                            'content-type': 'application/json', 
                            'x-uber-device': 'web', 
                            'x-auth-params-uuid': BranchId, 
                            'x-uber-breeze-rtapi-token': 'web-token', 
                            'accept': '*/*', 
                            'origin': 'https://restaurant-dashboard.uber.com', 
                            'sec-fetch-site': 'same-origin', 
                            'sec-fetch-mode': 'cors', 
                            'sec-fetch-dest': 'empty', 
                            'referer': 'https://restaurant-dashboard.uber.com/dashboard_v2/orders/all/', 
                            'accept-language': 'en-US,en;q=0.9', 
                            'cookie':cookie
                        },
                          data : data
                        };
                        console.log(config.url)
                        
                        let response = await axios(config)
                        console.log(JSON.stringify(response.data));
                    }
                })
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // signup: async function (req, res, next) {

    //     try {
    //         if (!req.body || !req.body.email || !req.body.email || req.body.email == "undefined" || req.body.password == "undefined") {
    //             return res.status(400).json(
    //                 {
    //                     "status": "400",
    //                     "error": "missing email or password in body"
    //                 })
    //         }

    //         else {
    //             let salt = await bcrypt.genSalt(10);
    //             let hasPassword = await bcrypt.hash(req.body.password, salt);
    //             console.log(hasPassword);

    //             let email = req.body.email;
    //             let phone = req.body.phone;
    //             console.log(email, phone);
    //             const prodsQuery1 = "select * from `User` where email=" + `'${email}'`;
    //             dbConn_sql.query(prodsQuery1, async function (error, results) {
    //                 if (error)
    //                     res.status(500).send(error);
    //                 if (!results || results.length == 0) {
    //                     const prodsQuery = "insert into `User` (Email,Phone,`password`) values(" + `'${email}',` + `${phone},` + `'${hasPassword}')`
    //                     console.log(prodsQuery);
    //                     dbConn_sql.query(prodsQuery, async function (error, results) {
    //                         console.log(prodsQuery)
    //                         if (error)
    //                             res.status(500).send(error);

    //                         if (results) {
    //                             return res.status(200).json(
    //                                 {
    //                                     "status": "200",
    //                                     "error": "user created successfully"
    //                                 }
    //                             );
    //                         }
    //                     })
    //                 }
    //                 else {

    //                     return res.status(200).json(
    //                         {
    //                             "status": "200",
    //                             "error": "user already exists"
    //                         })


    //                 }

    //             })

    //         }
    //         // Save User in the datab
    //     }
    //     catch (error) {
    //         res.status(500).send(error);
    //     }
    // },
    // login: async function (req, res, next) {
    //     try {
    //         if (!req.body || !req.body.email || !req.body.email || req.body.email == "undefined" || req.body.password == "undefined") {
    //             return res.status(400).json(
    //                 {
    //                     "status": "400",
    //                     "error": "missing email or password in body"
    //                 })
    //         }
    //         else {
    //             let email = req.body.email;
    //             const prodsQuery1 = "select * from `User` where email=" + `'${email}'`;
    //             dbConn_sql.query(prodsQuery1, async function (error, results) {
    //                 if (error)
    //                     res.status(500).send(error);
    //                 if (results.length == 0) {
    //                     return res.status(400).json(
    //                         {
    //                             "status": "400",
    //                             "error": "user does not exist"
    //                         })
    //                 }
    //                 else {
    //                     const validPass = await bcrypt.compare(req.body.password, results[0].password);
    //                     if (!validPass)
    //                         return res.status(400).send("Mobile/Email or Password is wrong");

    //                     // Create and assign token
    //                     let secret = "life is a mess"
    //                     const token = jwt.sign({ id: results[0].email, user_type: "manager" }, secret);
    //                     const verified = jwt.verify(token, secret);

    //                     console.log(verified.user_type);
    //                     return res.header("auth-token", token).status(400).json(
    //                         {
    //                             "status": "200",
    //                             "error": "logged in"
    //                         }
    //                     );
    //                 }
    //             })
    //         }
    //     } catch (error) {
    //         return res.status(500).send(error);
    //     }
    // },

    ready: async function (req, res, next) {
        try {
            if (!req.query.orderId || (req.query.orderId == "undefined")) {
                return res.status(400).json(
                    {
                        "status": "400",
                        "error": "missing ordeId in params"
                    }
                );
            }
            else {
                let orderId = req.query.orderId;
                console.log(orderId);
                const prodsQuery = "select * from `order` join session ON `order`.branch_id=`session`.branch_id where `order`.order_id=" + `"${orderId}"`
                dbConn_sql.query(prodsQuery, async function (error, results) {
                    console.log(prodsQuery)
                    if (error) throw error;
                    if (results) {
                        let legacyId = results[0].legacy_id;
                        let short_merchant_id = results[0].short_merchant_id;
                        let url1 = "https://api-gtm.grubhub.com/merchant/" + short_merchant_id + "/orders/" + legacyId + "/status";

                        let authentication_token = results[0].token;
                        console.log(url1)
                        await axios({
                            method: 'put',
                            url: url1,
                            data: { "status": "PICKUP_READY", "unpause_merchant": false },

                            headers: {
                                'Accept': 'application/json',
                                'content-type': 'application/json',
                                'authorization': authentication_token,
                                'origin': 'https://restaurant.grubhub.com'
                            }
                        }).then(response => {
                            res.status(200).json(response.data)
                            console.log(response.data)
                        }).catch(err => {
                            console.log(err);
                            res.status(404).json({ "error": err });
                        })
                    }
                })
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },
    confirm: async function (req, res, next) {
        try {
            if (!req.query.orderId || (req.query.orderId == "undefined")) {
                return res.status(400).json(
                    {
                        "status": "400",
                        "error": "missing ordeId in params"
                    }
                );
            }
            else {
                let orderId = req.query.orderId;
                console.log(orderId);
                const prodsQuery = "select * from `order` join session ON `order`.branch_id=`session`.branch_id where `order`.order_id=" + `"${orderId}"`
                dbConn_sql.query(prodsQuery, async function (error, results) {
                    console.log(prodsQuery)
                    if (error) throw error;
                    if (results) {
                        let legacyId = results[0].legacy_id;
                        let short_merchant_id = results[0].short_merchant_id;
                        let url1 = "https://api-gtm.grubhub.com/merchant/" + short_merchant_id + "/orders/" + legacyId + "/status";

                        let authentication_token = results[0].token;
                        console.log(url1)
                        await axios({
                            method: 'put',
                            url: url1,
                            data: { "status": "CONFIRMED", "wait_time_in_minutes": 10, "unpause_merchant": false },
                            headers: {
                                'Accept': 'application/json',
                                'content-type': 'application/json',
                                'authorization': authentication_token,
                                'origin': 'https://restaurant.grubhub.com'
                            }
                        }).then(response => {
                            res.status(200).json(response.data)
                            console.log(response.data)
                        }).catch(err => {
                            console.log(err);
                            res.status(404).json({ "error": err });
                        })
                    }
                })
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },
    verifyuser: async function (req, res, next) {
        try {
            if (!req.body || !req.body.email || !req.body.email || req.body.email == "undefined" || req.body.password == "undefined") {
                return res.status(400).json(
                    {
                        "status": "400",
                        "error": "missing email or password in body"
                    })
            }
            const prodsQuery = "select * from `User`  where email=" + `"${req.body.email}"`;
            dbConn_sql.query(prodsQuery, function (error, results) {
                console.log(prodsQuery)
                if (error) {
                    return res.status(400).json(
                        {
                            "status": "400",
                            "error": "wrong email in body"
                        })
                };
                if (results.length == 0) {
                    res.send("user does not exist");
                }
                if (results) {
                    if (results[0].Password == req.body.password) {
                        next();
                    }
                    else {
                        return res.status(400).json(
                            {
                                "status": "400",
                                "error": "wrong password in body"
                            })
                    }
                }
            })

        } catch (error) {
            res.status(500).send(error);
        }
    },
    getRestaurantAccess: async function (req, res, next) {
        try {
            const prodsQuery = "select * from `restaurant` join `branch` ON `branch`.Branch_id=restaurant.Restaurant_id where email= " + `"${req.body.email}"`;

            dbConn_sql.query(prodsQuery, function (error, results) {
                console.log(prodsQuery)
                if (error) throw error;
                if (results) {
                    console.log(results);
                    req.body.branch = results[0].Branch_id;
                    next();
                }
            })

        } catch (error) {
            res.status(500).send(error);
        }
    },
    getOrder: async function (req, res, next) {
        try {
            console.log(req.body);
            if (!req.query.orderId || (req.query.orderId == "undefined")) {
                return res.status(400).json(
                    {
                        "status": "400",
                        "error": "missing ordeId in params"
                    }
                );
            }
            else {
                const orderId = req.query.orderId;
                // query for fetching data with page number and offset
                const prodsQuery = "select * from `order`  JOIN `customer` ON  `order`.customer_id=customer.customer_id JOIN item ON `item`.order_id=`order`.order_id where `order`.`order_id`= " + `"${orderId} "` + " and `order`.`Branch_id` IN ('ce1a1d32-4053-45c5-93e5-79fde0bf0d06')"
                dbConn_sql.query(prodsQuery, function (error, results) {
                    console.log(prodsQuery)
                    if (error) throw error;
                    if (results) {
                        let item_count = results.length;
                        let items = [];
                        for (key of results) {
                            items.push({ item_id: key.item_id, item_name: key.item_name, item_price: key.price, item_quantity: key.quantity });
                        }
                        let orderObject = {
                            "order_id": results[0].order_id,
                            "sub_total": results[0].sub_total,
                            "tax": results[0].tax,
                            "total": results[0].total,
                            "Branch_id": results[0].Branch_id,
                            "platform_id": results[0].platform_id,
                            "customer_id": results[0].customer_id,
                            "status": results[0].status,
                            "note": results[0].note,
                            "order_time": results[0].order_time,
                            "Name": results[0].Name,
                            "phone": results[0].phone,
                            "address": results[0].address,
                            "item_count": items.length,
                            "items": items
                        }
                        res.send([orderObject]);
                    }

                })
            }

        }
        catch (eroor) {
            res.status(500).send(error);


        }
    },
    getAllOrder: async function (req, res, next) {
        try {
            console.log(req.query.page, req.query.limit);
            if (!req.query.limit || !req.query.page || (req.query.limit == "undefined") || (req.query.page = "undefined")) {
                return res.status(400).json(
                    {
                        "status": "400",
                        "error": "missing size in params"
                    }
                );
            }
            else {
                let req_token = req.headers.token;
                const limit = req.query.limit;
                // page number
                const page = req.query.page;
                // calculate offset
                const offset = (page - 1) * limit;
                let totalPage;

                if (req.query.state == "confirmed") {
                    const prodsQuery1 = "select * from `order`  JOIN `customer` ON  `order`.customer_id=customer.customer_id JOIN item ON `item`.order_id=`order`.order_id  where `order`.status='delivered' "
                    dbConn_sql.query(prodsQuery1, function (error, results) {
                        if (error) throw error;
                        if (results) {
                            totalPage = Math.ceil(results.length / limit);

                        }

                    })
                    // query for fetching data with page number and offset
                    const prodsQuery = "select * from `order`  JOIN `customer` ON  `order`.customer_id=customer.customer_id JOIN item ON `item`.order_id=`order`.order_id limit " + `${limit}` + " offset " + `${offset}`
                    dbConn_sql.query(prodsQuery, function (error, results) {
                        if (error) throw error;
                        if (results) {

                            res.send({
                                "currentpage": page,
                                "limit": limit,
                                "pageCount": totalPage,
                                "orders": results
                            });
                        }

                    })
                }
                else if (req.query.state == "ready") {
                    const prodsQuery1 = "select * from `order`  JOIN `customer` ON  `order`.customer_id=customer.customer_id JOIN item ON `item`.order_id=`order`.order_id where `order`.status='ready' "
                    dbConn_sql.query(prodsQuery1, function (error, results) {
                        if (error) throw error;
                        if (results) {
                            totalPage = Math.ceil(results.length / limit);

                        }

                    })
                    // query for fetching data with page number and offset
                    const prodsQuery = "select * from `order`  JOIN `customer` ON  `order`.customer_id=customer.customer_id JOIN item ON `item`.order_id=`order`.order_id limit " + `${limit}` + " offset " + `${offset}`
                    dbConn_sql.query(prodsQuery, function (error, results) {
                        if (error) throw error;
                        if (results) {
                            res.send({
                                "currentpage": page,
                                "limit": limit,
                                "pageCount": totalPage,
                                "orders": results
                            });
                        }

                    })
                }
            }

        }
        catch (error) {
            res.status(500).send(error);


        }
    },
    totalOrders: async function (req, res, next) {
        try {
            if (!req.query.limit || !req.query.page || (req.query.limit == "undefined") || (req.query.page = "undefined")) {
                return res.status(400).json(
                    {
                        "status": "400",
                        "error": "missing limit ofr page number in params"
                    }
                );
            }
            else {
                const limit = req.query.limit;
                // page number
                const page = req.query.page;
                // calculate offset
                const offset = (page - 1) * limit;
                let totalPage;

                let prodsQuery1 = "select b.Branch_name,c.Name,o.order_id,o.total,created_date,group_concat(i.item_name) as item from `order`  o JOIN `customer` c ON  o.customer_id=c.customer_id JOIN  item i ON i.order_id=o.order_id JOIN branch b ON b.branch_id=o.branch_id group by o.order_id limit " + `${limit}` + " offset " + `${offset}`
                dbConn_sql.query(prodsQuery1, function (error, results) {
                    if (error) throw error;
                    if (results) {
                        totalPage = Math.ceil(results.length / limit);

                        for (key of results) {
                            let item = key.item;
                            let items = item.split(',');
                            console.log(items);
                            key.items = items
                        }
                        res.send({
                            "currentpage": page,
                            "limit": limit,
                            "pageCount": totalPage,
                            "orders": results
                        });
                    }

                })
            }

        } catch (error) {
            res.status(500).send(error);
        }
    },
    get_customer: async function (req, res, next) {

        try {
            console.log(req);
            let id = req.params.orderid;
            await Customer.get_customer_details(id, async function (err, customer_details) {
                if (err)
                    console.log(err);
                else {
                    if (!customer_details) {
                        return res.status(200).json(
                            {
                                "status": "200",
                                "state": "no record found"
                            }
                        );
                    }
                    res.status(200).json(
                        {
                            "status": "200",
                            "state": "successfull",
                            "Customer": customer_details
                        }
                    );
                }
            });
        }

        catch (error) {
            res.status(500).send(error);

        }
    },
    get_grubhub_orders: async function (req, res, next) {

        try {
            let id = 2;
            console.log(req);
            await Order.get_grubhub_order(id, async function (err, all_grubhub_orders) {
                if (err)
                    console.log(err);
                else {
                    if (all_grubhub_orders.length == 0) {
                        return res.status(200).json(
                            {
                                "status": "200",
                                "state": "no record found"
                            }
                        );
                    }
                    res.status(200).json(
                        {
                            "status": "200",
                            "state": "successfull",
                            "Grubhub Orders": all_grubhub_orders
                        }
                    );
                }
            });
        }

        catch (error) {
            res.status(500).send(error);

        }
    },

    get_uber_eats_orders: async function (req, res, next) {

        try {
            let id = 1;
            await Order.get_uber_eats_order1(id, async function (err, all_uber_eats_orders) {
                if (err)
                    console.log(err);
                else {
                    if (all_uber_eats_orders.length == 0) {
                        return res.status(200).json(
                            {
                                "status": "200",
                                "state": "no record found"
                            }
                        );
                    }
                    res.json(
                        {
                            "status": "200",
                            "state": "successfull",
                            "Uber-eats Orders": all_uber_eats_orders
                        }
                    );
                }
            });
        }
        catch (error) {
            console.log("upload - catch block");
            console.log(error);
            return next();

        }
    },

    get_items: async function (req, res, next) {

        try {
            console.log(req.body);

            if (!req.params.orderid) {
                return res.status(400).json(
                    {
                        "status": "400",
                        "error": "missing orderid in params"
                    }
                );
            }
            else {
                let orderid = await Number(req.params.orderid);
                console.log(req.params.orderid)
                await Item.get_items(orderid, async function (err, all_item_details) {
                    if (err)
                        console.log(err);
                    else {
                        if (all_item_details.length == 0) {
                            return res.status(400).json(
                                {
                                    "status": "200",
                                    "state": "no record found"
                                }
                            );
                        }
                        console.log(all_item_details[0]);
                        let item = new Array();
                        for (let j = 0; j < all_item_details.length; j++) {
                            item[j] = await all_item_details[j]
                        }
                        res.status(200).json(
                            {
                                "status": "200",
                                "state": "successfull",
                                "items": item
                            }
                        );
                    }
                });
            }
        }
        catch (e) {
            console.log("upload - catch block");
            console.log(e);
            return next();
        }
    }
}