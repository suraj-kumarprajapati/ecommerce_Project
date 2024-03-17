/**
 * This is a route for authorisation and authentication of users
 * 
 * route for 
 * 
 * POST localhost://8888/ecomm/api/v1/auth/singup
 * 
 * POST localhost:8888/ecomm/api/v1/auth/singin
 */

// import 
const authController = require('../controllers/auth.controller');
const auth_mw = require('../middlewares/auth.mw');



module.exports = (app) => {
  app.post('/ecomm/api/v1/auth/singup',[auth_mw.verifySignUpBody], authController.signUp);
  app.post('/ecomm/api/v1/auth/singin',[auth_mw.verifySignInBody],  authController.signIn);
}