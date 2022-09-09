const express = require("express");
const userController = require('../controllers/userController');
const userRouter = express.Router();

// routes
userRouter.route('/')
  // .get(productController.obtenerProductos)
  .post(userController.agregarUsuario);
// userRouter.route('/:id')
//   .get(productController.obtenerProductoId)
//   .delete(productController.borrarProductoId)
//   .put(productController.actualizarProductoId);

module.exports = userRouter;