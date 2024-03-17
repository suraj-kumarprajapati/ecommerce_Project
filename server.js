/**
 * This is the starting file of this project
 */

// import
const mongoose = require('mongoose');
const db_config = require('./configs/db.config');
const user_model = require('./models/user.model');
const express = require('express');     // express is a function
const brypt = require('bcryptjs');
const server_config = require('./configs/server.config');

/**
 * Initially we have to insert the adming entry in DB
 */


const app = express();

// convert json in js object
app.use(express.json());    // middleware


// connection to the database
mongoose.connect(db_config.DB_URL);
const db = mongoose.connection;




// if failure occurs during connection
db.on("error", ()=> {
  console.log("Error while connection to the database");
})

// if successfully connected to the database
db.once("open", ()=> {
  console.log("Successfully connected to the database");
  init();
});

// create the database for user and insert the first entry of admin
async function init() {
  // if already available
  try{
    const user = await user_model.findOne({userId : 'admin'});
    if(user){
      console.log("admin is already present");
      console.log(user);
      return;
    }
  }
  catch(err){
    console.log("Error occured during the fetching of already availabe admin details from DB : ", err);
  }


  // if not available
  try{
    const user = {
      name : "suraj prajapati",
      userId : "admin",
      userType : "ADMIN",
      email : "admin@gmail.com",
      password : brypt.hashSync("admin@password", 8)
    }
    const userAdmin = await user_model.create(user);
    console.log(userAdmin);
  }
  catch(err){
    console.log("error occured during the creation of admin in the DB : ", err);
  }
  

}


// stitching the route
require('./routes/auth.route')(app);
require('./routes/category.route')(app);

// running the express funciton
app.listen(server_config.PORT, ()=>{
  console.log("Server started at port no : ", server_config.PORT);
})