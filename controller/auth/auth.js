const Otp = require('../../models/otp');
const userModel = require('../../models/user');
const responseFormatter = require('../common/responseFormatter');
const jwt = require('jsonwebtoken');

async function createOtp(req, res){
    try{
        let userOtp = 9999;
       
        let otp = await Otp.findOne({email: req.body.email});
        if(!otp){
            let createdOtp = await Otp.create({
                email: req.body.email,
                otp: userOtp
            });
        }
        return responseFormatter.success(res, 'OTP Sent', {});
        //let res1 = await otpMailer.newOtpMail(req, res,userOtp);
        
    }catch(error){
        console.log(error);
        return responseFormatter.internalError(res);
    }
}

async function verifyOtp(req, res){
    try{
        let email = req.body.email;
        let otp = req.body.otp;

        let otpData = await Otp.findOne({email: email, otp: otp});
        if(!otpData){
            return responseFormatter.badRequest(res, 'Invalid OTP')
        } else{
            await Otp.deleteOne({email:email, otp: otp});
        }
        let userData = await userModel.findOne({ email: email });

        if (!userData) {
          userData = await userModel.findOne({ email: email });
          userData = await userModel.create({
            userName: email,
          });
        }

        const token = jwt.sign({_id: userData._id, email:email}, 'jwtPrivateKey');   
        return responseFormatter.success(res, '', token);

    }catch(error){
        console.log(error);
        return responseFormatter.internalError(res);
    }
}


async function auth(req, res, next){
    try { 
        let token = req.headers.authorization;
        token = token.replace("Bearer","").trim();
        if(!token) {
            return responseFormatter.unauthorized(res, 'Accesss Denied. No token Provieded');
        }
        const decoded = jwt.verify(token, 'jwtPrivateKey');
        req.user = decoded;   
        next();
    } catch (ex) {
        console.log(ex)
        return responseFormatter.unauthorized(res,'Invalid token')
    }

}


module.exports = {
    createOtp,
    verifyOtp,
    auth
}