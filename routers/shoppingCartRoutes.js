const express = require("express");
const shoppingCartController = require('../controllers/shoppingCartController');
const authController = require('../controllers/authController');
const shoppingCartRouter = express.Router();

// routes
shoppingCartRouter.route('/')
  .all(authController.protect)
  .get(shoppingCartController.listarCarrito)
shoppingCartRouter.route('/:idUsuario')
  .all(authController.protect)
  .post(shoppingCartController.crearCarrito);
shoppingCartRouter.route('/:idUsuario/producto/:idProducto')
  .all(authController.protect)
  .delete(shoppingCartController.borrarProducto);
shoppingCartRouter.route('/:idCarrito')
  .all(authController.protect)
  .post(shoppingCartController.pagarCarrito);

module.exports = shoppingCartRouter;