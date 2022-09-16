const express = require("express");
const userController = require('../controllers/userController');
const userRouter = express.Router();

// routes
userRouter.route('/')
  .get(userController.obtenerUsuarios)
  .post(userController.agregarUsuario);
userRouter.route('/:id')
  .get(userController.obtenerUsuarioId)
  .delete(userController.borrarUsuarioId)
  .put(userController.actualizarUsuarioId);

module.exports = userRouter;