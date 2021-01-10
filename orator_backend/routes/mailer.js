
var nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: '67danishali@gmail.com',
           pass: '1712minato'
       }
   });
   

