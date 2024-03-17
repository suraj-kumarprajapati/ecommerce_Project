/**
 * Controller for creating the category
 *  
 * POST localhost:8888/ecomm/api/v1/categories
 * 
 * {
 *  "name" : "Household",
 *  "description" : "This will contain all the household items"
 * }
 * 
 */

// import
const category_model = require('../models/category.model');


exports.createNewCategory = async (req, res) => {
  // read the request body
  const request_body = req.body;

  //create the category object 
  const cat_data = {
    name : request_body.name,
    description : request_body.description
  }

  // insert into mongodb
  // return the response of created category
  try{
    const category = await category_model.create(cat_data);
    res.status(201).send({category});
  }
  catch(err){
    console.log("Error while creating category in mongoDB");
    res.status(500).send({
      message : "Error while creating category in mongoDB"
    });
  }
  
}


// defination for getNewCategory()
exports.getCategory = async (req, res) => {
  // read the request body
  // get data from the database

  try{
    const categoryData = await category_model.findOne({name : req.body.name});

    if(!categoryData) {
      return res.status(401).send({
        message : "This category does not exist"
      });
    }

    // if data found -> send the response
    res.status(201).send(categoryData);

  }
  catch(err) {
    console.log("Error while getting category data from database");
    res.status(500).send({
      message : "Error while getting category data from database"
    });
  }
  



}