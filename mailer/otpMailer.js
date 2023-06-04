const nodeMailer = require('../connection/nodemailer');


exports.newOtpMail = (req,res,otp) =>{
    try{
        let mail = nodeMailer.transporter.sendMail({
        from: 'your email',
        to: req.body.email,
        subject: "Your OTP",
        html: `<h1> Your OTP is ${otp}</h1> <p> Do not share this OTP with anyone</p>`

    })
    return mail;
   }catch(error){
            console.log(error);
   }
}
