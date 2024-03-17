/**
 * POST localhost:8888/ecomm/api/v1/categories [Only Admin]
 * GET  localhost:8888/ecomm/api/v1/categories [Logged in User]
 */

// import
const category_controller = require('../controllers/category.controller');
const auth_mw = require('../middlewares/auth.mw');
const category_mw = require('../middlewares/category.mw');


module.exports = (app) => {
  app.post("/ecomm/api/v1/categories", [auth_mw.verifyToken, auth_mw.isAdmin], category_controller.createNewCategory);
  app.get("/ecomm/api/v1/categories",[auth_mw.verifyToken, category_mw.verifyCategoryRequestBody], category_controller.getCategory);
}