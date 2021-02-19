
// const puppeteer = require('puppeteer');
// const axios = require('axios');
// const { Sequelize, QueryTypes } = require('sequelize');
// const transform = require('./transformer');
// var dbConn_mongo = require('./../mongo');
// async function getOrders(token) {
//     try {
  
//       let config = {
//         method: 'get',
//         url: 'https://merchant-mobile-bff.doordash.com/v1/active_orders/1108572?auto_confirm=false',
//         headers: {
//           'Authorization': 'JWT ' + token,
//           'Cookie': 'dd_device_id_2=dx_a80138056180477d91faf475d13923f1; dd_device_id=dx_391c52cf8cea48e599b897eb990490fe; __cfduid=d0097d7c5bc2bd15284c899bfc8ca504b1613043461; __cf_bm=c22eaa7c8601845686d24bb5b0ed9f04342e5639-1613127946-1800-AeTYGSGiFY0xb0i1OzrwtBIcb/weujW70GXBgsInE28DrMnQ0LxDAmxQi9PNXokZdWE2e7ped1zOT9HNAFp2U5I='
//         }
//       };
  
//       let response = await axios(config);
//       let data=[response.data];
//       console.log(response.data)
//       devices.insertMany(
      
//         [data])
  
//     } catch (error) {
//       console.log(error);
//     }
  
//   }