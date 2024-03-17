/**
 * It is the middleware file for category
 */

// import
const auth_controller = require('../controllers/auth.controller');

const verifyCategoryRequestBody = (req, res, next) => {
  
  if(!req.body.name) {
    console.log("category name was not provided in the request body");
    return res.status(400).send({
      message : "category name was not provided in the request body"
    });
  }

  // go to next
  next();
}


// export
module.exports = {
  verifyCategoryRequestBody : verifyCategoryRequestBody
}