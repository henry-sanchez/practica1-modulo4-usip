const express = require("express");
const productController = require('../controllers/productController');
const productRouter = express.Router();

// routes
productRouter.route('/')
  .get(productController.obtenerProductos)
  .post(productController.agregarProducto);
productRouter.route('/:id')
  .get(productController.obtenerProductoId)
  .delete(productController.borrarProductoId)
  .put(productController.actualizarProductoId);

module.exports = productRouter;