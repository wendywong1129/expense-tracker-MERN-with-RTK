const routes = require("express").Router();
const controller = require("../controllers/controller");

routes
  .route("/api/categories")
  .post(controller.createCategory)
  .get(controller.getCategories);

routes
  .route("/api/transactions")
  .post(controller.createTransaction)
  .get(controller.getTransactions)
  .delete(controller.deleteTransaction);

routes.route("/api/labels").get(controller.getLabels);

module.exports = routes;
