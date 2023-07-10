// // "use strict";
const nodemailer = require("nodemailer");

const contact = function(email, message){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "cochymnal@gmail.com",
            pass: "mnxoexbwlzoowafk"
        }
    });
        var mailOptions = {
            from: 'cochymnal@gmail.com',
            to: email, 
            subject: "Hi Valiant From cocHymal",
            html: `<h1> ${message} </h1><br>
            `
        }
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
    });
}


module.exports  = { contact }