const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "cochymnal@gmail.com",
        pass: "mnxoexbwlzoowafk"
    }
});

const contact = function(email, e){
        var mailOptions = {
            from: 'cochymnal@gmail.com',
            to: email, 
            subject: "cocHymal one-time password",
            html: ` <p>Your one-time password is <span style="padding:6px; fontweight:bold; background:grey; fontsize: 14px; color: white;" >${e}</span> , This password was expire within 2mins</p>`
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