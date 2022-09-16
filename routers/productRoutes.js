const express = require("express");
const productController = require('../controllers/productController');
const productRouter = express.Router();
const authController = require("./../controllers/authController");

// routes
productRouter.route('/')
  .all(authController.protect)
  .get(productController.obtenerProductos)
  .post(productController.agregarProducto);
productRouter.route('/:id')
  .all(authController.protect)
  .get(productController.obtenerProductoId)
  .delete(productController.borrarProductoId)
  .put(productController.actualizarProductoId);

module.exports = productRouter;