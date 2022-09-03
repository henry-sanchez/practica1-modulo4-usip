const axios = require('axios');

const mostrarMensaje2 = (nombre, apellido) => {
  console.log(`Bienvenido(a): ${nombre} ${apellido}`);
};

const mostrarMensaje1 = (nombre) => {
  console.log(`Bienvenido(a): ${nombre}`);
};

module.exports = {
  mostrarMensaje1,
  mostrarMensaje2
};