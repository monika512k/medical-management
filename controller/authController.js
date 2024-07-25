const User = require("../model/user");
const response = require("../config/response");
const constants = require("../config/constants");
const helper = require("../helper/helper");
const { Validator } = require("node-input-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.login = async (req, res) => {

    const postData = req.body;
    const v = new Validator(postData, {
        email: 'required|email',
        password: 'required'
    });

    let matched = await v.check();

    if (!matched) {
        return response.returnFalse(req, res, helper.validationErrorConvertor(v), {});
    }
    try {

      const userInfo = await User.findOne({email: postData.email});
      if (!userInfo) {
        return response.returnFalse(req, res, 'Oops please try again', {});
      }
      if(userInfo && (await bcrypt.compare(postData.password, userInfo.password))) {
          const token = jwt.sign(
              { id: userInfo._id },
              process.env.JWT_TOKEN_KEY,
              {
                  expiresIn: constants.CONST_VALIDATE_SESSION_EXPIRE,
              }
          );

          let tempObj = {
              _id: userInfo._id,
              email: userInfo.email,
              name: userInfo.name,
              token: token
          };

          return response.returnTrue(req, res, 'Login successfully', tempObj);
          } 
      else 
      {
        return response.returnFalse(req, res, 'Invalid credentials', {});
      }
    } catch (e) {
        return response.returnFalse(req, res, e.message, {});
    }
};






