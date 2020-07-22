
var nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: '1712danishali@gmail.com',
           pass: 'Qwerty123#'
       }
   });
   

