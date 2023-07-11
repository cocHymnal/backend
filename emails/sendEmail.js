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
            subject:"One-time password - Hymms with Audio of COC",
            html: `
            <div style='width: 100%; padding: 0; margin: 0;'>
            <div style="width: 100%; background:
             #fff; padding: 0; display: flex; height: 100%; justify-content: center; align-items: center;">
                <img style="width: 100%;" src="https://www.linkpicture.com/q/Group-1_36.png" alt="">
            </div>
            <div style="padding: 15px; margin: 0; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            ">
                <h4 style="font-size: 15px; padding: 10px;">Your one-time password is <span style="padding:6px; fontweight:bold; background:grey; fontsize: 14px; color: white;" >${e}</span> , This password will expire within 2mins.</h4>
            </div>
        </div>`
        }
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
    });
}



const welcome = function(email, e){
  var mailOptions = {
      from: 'cochymnal@gmail.com',
      to: email, 
      subject: "Hymms with Audio of COC",
      html: `
      <div style='width: 100%; padding: 0; margin: 0;'>
      <div style="width: 100%; background:
       #fff; padding: 0; display: flex; height: 100%; justify-content: center; align-items: center;">
          <img style="width: 100%;"  src="https://www.linkpicture.com/q/Group-1_36.png" alt="">
      </div>
      <div style="padding: 15px; margin: 0; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      ">
          <h3>Yello ${e},</h3>
          <h4 style="font-size: 12px;">Hi! Welcome to the Church of Christ Hymns with Audio. Listen and sing to glorify God.</h4>
      </div>
  </div>`
  }
  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
});
}

module.exports  = { contact, welcome }