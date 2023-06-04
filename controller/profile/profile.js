const userModel = require("../../models/user");
const responseFormatter = require("../common/responseFormatter");
const moment = require('moment');

async function getProfile(req, res) {
  try {
    const user = await userModel.findById(req.user._id);
    return responseFormatter.success(res, "", user);
  } catch (err) {
    return commonResponses.internalError(res);
  }
}

async function updateProfile(req, res) {
  try {

    const user = await userModel.findById(req.user._id);
    const payload = req.body;
    if (!user) {
      return responseFormatter.unauthorized(res, "Invalid user");
    }

    let filename = null;
    if(req.files && req.files.length){
      filename = req.files[0].filename;
    }

    const userDetails = {
        firstName: payload.firstName ? payload.firstName: user.firstName,
        dob: payload.dob ? moment(payload.dob, 'dd-mm-yyyy').toDate(): user.dob,
        lastName: payload.lastName ? payload.lastName: user.lastName,
        gender: payload.gender ? payload.gender: user.gender,
        interestedIn: payload.interestedIn ? payload.interestedIn: user.interestedIn,
        interests: payload.interests ? payload.interests: user.interests,
        avatar: payload.avatar ? payload.avatar: filename
    }

    await userModel.findOneAndUpdate({_id: req.user._id} ,userDetails);
    return responseFormatter.success(res, "", userDetails);
  } catch (err) {
    console.log(err)
    return responseFormatter.internalError(res);
  }
}

module.exports = {
  getProfile,
  updateProfile
};
