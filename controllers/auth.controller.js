/**
 * It will the the authority and authentication of the user
 */

// import 
const user_model =  require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../configs/auth.config');



const signUp = async (req, res) => {
  // read the request body
  const req_body = req.body;

  // create user object
  const  user_obj = {
    name : req_body.name,
    userId : req_body.userId,
    email : req_body.email,
    userType : req_body.userType,
    password : bcrypt.hashSync(req_body.password, 8)
  }


  // save the user in the database
  // return the response

  
  try{
    const user_created = await user_model.create(user_obj);
    console.log("user registered successfully");

    // for sending the resp without sharing the password
    const res_obj = {
      name : user_created.name,
      userId : user_created.userId,
      email : user_created.email,
      userType : user_created.userType
    }

    // send the response
    res.status(201).send(res_obj);

  }
  catch(err){
    console.log("Error while registering the user : ",err);
    res.status(500).send({
      message : "Error while registering the user"
    });

  }
}

const signIn = async (req, res) => {
  // read the request body
  // check if the userId is present in the system or not
  const user = await user_model.findOne({userId : req.body.userId});

  if(!user) {
    return res.status(400).send({
      message : "userId passed is not a valid userId"
    });
  }

  // check if the password is correct or not
  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
  if(!isPasswordValid){
    return res.status(401).send({
      message : "Invalid password"
    })
  }


  // return the jsonwebtoken as response with given TTL
  const token = jwt.sign({id : user.userId}, secret.secret, {
    expiresIn : 120   // seconds
  });

  res.status(200).send({
    name : user.name,
    userId : user.userId,
    email : user.email,
    userType : user.userType,
    accessToken : token
  });

}



module.exports = {
  signUp : signUp,
  signIn : signIn
}


