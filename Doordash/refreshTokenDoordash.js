// const puppeteer = require('puppeteer');
// const axios = require('axios');
// const fetch = require("node-fetch");

// const { Sequelize, QueryTypes } = require('sequelize');
// module.exports = {

//     get_connection: async function () {
//         let sequelize = new Sequelize('mysql://digiprex:LDcF4K0lD0tSTJYwIUmi@digiprexapi.ctky9owxz1tq.ap-south-1.rds.amazonaws.com:3306/gkc_husky');
//         try {
//             await sequelize.authenticate();
//             console.log('Connection has been established successfully.');
//             return sequelize;
//         } catch (error) {
//             console.error('Unable to connect to the database:', error);
//         }

//     },

//     refreshToken: async function (sequelize, DoordashBranchDetails) {
//         // branch_details_grubhub = await this.get_branch(sequelize);
//         for (let i = 0; i < DoordashBranchDetails.length; i++) {
//             await this.getToken(DoordashBranchDetails[i], sequelize);
//         }
//     },


//     updateToken: async function getToken(DoordashBranchDetails, sequelize) {
//         try {
//             var data = '{"credentials":{"password":"' + `${password}` + `","email":"` + `${email}` + `"}}'`;
//             let password = DoordashBranchDetails.password;
//             let email = DoordashBranchDetails.email
//             let config = {
//                 method: 'post',
//                 url: 'https://identity.doordash.com/api/v1/auth/token',
//                 headers: {
//                     'Authorization': 'Ft98fOkQwIcAAAAAAAAAANmMvfQvWUg8AAAAAAAAAACimJeZMkWvEwAAAAAAAAAA',
//                     'User-Agent': 'DoordashMerchant/2.61.1 (Android 8.1.0; unknown Custom Phone)',
//                     'X-Device-Id': '418a448c7dd7a5be',
//                     'X-Correlation-Id': '57102645-e08d-45cc-a6a6-a5f8c5b1ec00',
//                     'Content-Type': 'application/json; charset=UTF-8',
//                     'Content-Length': '76',
//                     'Host': 'identity.doordash.com',
//                     'Connection': 'close',
//                     'Accept-Encoding': 'gzip, deflate',
//                     'X-NewRelic-ID': 'XAUEWF5SGwEJV1ZRDgEE',
//                     'Cookie': 'dd_device_id_2=dx_a80138056180477d91faf475d13923f1; dd_device_id=dx_391c52cf8cea48e599b897eb990490fe; __cfduid=d4adcb8a9901b0958080b468449805fb11612432482; __cfduid=d0097d7c5bc2bd15284c899bfc8ca504b1613043461; __cf_bm=f81ea22a3b36afdc9d77b69f4ee57e057addfe98-1613114189-1800-Adi13lfPwviWKglP4sxyduNEdy3g03cxHZXAw7pWXvAdOYn0nrM54rYnA25DmrA/p4U6Nd/2GP2Y2eUHb9/aulE='
//                 },
//                 data: data
//             };

//             let response = await axios(config)
//             let token=  response.data.token.token;
//             await sequelize.query('REPLACE  into session (token) values(?) where Branch_id="3"', { replacements: [orders.customer_id, orders.customer_name, orders.customer_phone], type: QueryTypes.INSERT });

//         } catch (error) {
//             console.log(error);
//         }

//     },
//     getToken:async function getToken(sequelize, branch_details) {
//         try {
//             let branch_token=[];
//             for(let i=0;i<branch_details.length;i++){
//             let Branch_id = branch_details[i].Branch_id;
//             let session = await sequelize.query('SELECT * FROM session  WHERE Branch_id=?', { replacements: [Branch_id], type: QueryTypes.SELECT });
//             let branch_token_pair={branch_id:Branch_id,token:session[0].token};
//             branch_token.push(branch_token_pair);
//             }
//             return (branch_token);
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }






