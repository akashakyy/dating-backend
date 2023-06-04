const nodemailer = require('nodemailer');
const emailConfig = require('../config/nodemailerConfig.json');


let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure: false,
    auth: {
        user : emailConfig.email,
        pass : emailConfig.password
    }
});

  module.exports = {
    transporter : transporter     
  }