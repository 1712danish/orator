
var nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'Oratorlpu.pi@gmail.com',
           pass: 'Orator@soc'
       }
   });
   

