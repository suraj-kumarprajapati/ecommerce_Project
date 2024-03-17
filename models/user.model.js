/**
 * Definition of user schema
 */

// import dependencies
const mongoose = require('mongoose');


/**
 * name
 * userId
 * password
 * email
 *userType
 */
const userSchema = new mongoose.Schema({
  name : {
    type: String,
    required : true,
  },
  userId : {
    type : String,
    required : true,
    unique : true
  }, 
  email : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    minlength : true
  },
  userType : {
    type : String,
    required : true,
    default : "CUSTOMER",
    enum : ["ADMIN", "CUSTOMER"]
  }, 
  password : {
    type : String, 
    required : true
  }
}, {timestamps : true, versionKey : false});


// export the schema
module.exports = mongoose.model("User", userSchema);  // mongodb will make it plural -> Users