
var nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'oratorlpu.pi@gmail.com',
           pass: 'Orator@soc'
       }
   });
   

