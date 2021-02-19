const express = require('express');
const  bodyParser=require('body-parser');


const app = express();
app.use(bodyParser.json());


const port =  6000;

var uploadRouter = require('./src/routes/routes');
// app.use(fileUpload());

app.use('/', uploadRouter);
app.listen(port);

