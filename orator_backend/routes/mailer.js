
var nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'oratorlpu.pi',
           pass: 'Orator@soc'
       }
   });
   

