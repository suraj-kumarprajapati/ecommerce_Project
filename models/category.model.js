/**
 * name, description
 */


// import
const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
    unique : true
  },
  description : {
    type : String, 
    required : true,
  }
}, {timestamps : true, versionKey : false});

// export this model
module.exports = mongoose.model("category", categorySchema);