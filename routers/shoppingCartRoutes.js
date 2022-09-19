const express = require("express");
const shoppingCartController = require('../controllers/shoppingCartController');
const authController = require('../controllers/authController');
const shoppingCartRouter = express.Router();

// routes
shoppingCartRouter.route('/')
  .get(shoppingCartController.listarCarritos) // ruta abierta
  .post(
    authController.protect,
    shoppingCartController.crearCarrito,
  );
shoppingCartRouter.route('/user')
  .all(authController.protect)
  .get(shoppingCartController.listarCarritosPorUsuario);
shoppingCartRouter.route('/:idProduct')
  .all(authController.protect)
  .delete(shoppingCartController.borrarProducto);
shoppingCartRouter.route('/:idCart')
  .all(authController.protect)
  .post(shoppingCartController.pagarCarrito);

module.exports = shoppingCartRouter;