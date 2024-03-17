/**
 * This is a middleware for auth.js
 */

// import 
const user_model = require('../models/user.model');
const jwt = require('jsonwebtoken');
const auth_config = require('../configs/auth.config');

const verifySignUpBody = async (req, res, next) => {

  try{
    // check for the name
   if(!req.body.name){
    return res.status(400).send({
      message : "Failed ! Name was not provided in the request body"
    })
  }

  // check for the email
  if(!req.body.email){
    return res.status(400).send({
      message : "Failed ! Email was not provided in the request body"
    })
  }

  // check for the userId
  if(!req.body.userId){
    return res.status(400).send({
      message : "Failed ! userId was not provided in the request body"
    })
  }

  // check for the userId
  if(!req.body.password){
    return res.status(400).send({
      message : "Failed ! password was not provided in the request body"
    })
  }

  // check if the user with the same userId already exists
  const user = await user_model.findOne({userId : req.body.userId});

  if(user){
    return res.status(400).send({
      message : "Failed ! user with this userId already exits"
    })
  }

  // move to next
  next();
  }
  catch(err) {
    console.log("Error while validating the request body : ", err);
    res.status(500).send({
      message : "Error while validating the request body"
    })
  }

}

// check for signin
const verifySignInBody = async (req, res, next) => {
  // check for the userId
  if(!req.body.userId){
    return res.status(400).send({
      message : "Failed ! userId was not provided in the request body"
    })
  }

  // check for the password
  if(!req.body.password){
    return res.status(400).send({
      message : "Failed ! password was not provided in the request body"
    })
  }

  // move to next
  next();
}

// verify the user
const verifyToken = (req, res, next) => {
  // check if the token is present or not
  const token = req.headers['x-access-token'];

  if(!token) {
    return res.status(403).send({
      message : "No token found ! Unauthorised"
    });
  }

  // check if it's valid or not
  jwt.verify(token, auth_config.secret, async (err, decoded) =>{

    if(err){
      return res.status(402).send({
        message : "UnAuthorized"
      });
    }

    const user = await user_model.findOne({userId : decoded.id});
    if(!user) {
      return res.status(402).send({
        message : "UnAuthorized ! user for this token doesn't exist"
      });
    }

  // move to next and set the user information in req.user
  req.user = user;
  next();

  });

}

// check if the user is admin or not
const isAdmin = (req, res, next) => {
  const user = req.user;

  if(user && user.userType == "ADMIN") {
    next();
  }
  else {
    res.status(403).send({
      message : "Only Admin users are allowed to access this endpoint"
    });
  }
}


module.exports = {
  verifySignUpBody : verifySignUpBody,
  verifySignInBody : verifySignInBody,
  verifyToken : verifyToken,
  isAdmin : isAdmin
}