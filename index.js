const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors()) 

const db = require('./connection/mongoose');
const otpMailer = require('./mailer/otpMailer');
const Otp = require('./models/otp');

app.use(bodyParser.urlencoded({
    extended: true
  }));


app.use('/', require('./routes/index'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})