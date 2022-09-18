const ShoppingCart = require('../models/ShoppingCart');
const catchAsync = require('../utils/catchAsync');

// Handlers
exports.listarCarrito = catchAsync(async (req, res) => {
  const carritos = await ShoppingCart.find();

  res.status(200).json({
    status: 'success',
    results: carritos.length,
    data: { carritos },
  });
});

exports.crearCarrito = catchAsync(async (req, res) => {
  const { idUsuario } = req.params;
  const { idProducto, cantidad } = req.body;
  let carrito;
  const carritos = await ShoppingCart.find({
    user: idUsuario,
  });
  if (carritos.lenght === 0) {
    carrito = new ShoppingCart({
      user: idUsuario,
      status: 'PENDING',
      products: [{
        idProducto,
        cantidad,
      }]
    });
  } else {
    carrito = carritos.find((carrito) => carrito.status === 'PENDING');
    if (carrito) {
      carrito.products.push({
        idProducto,
        cantidad,
      });
    } else {
      carrito = new ShoppingCart({
        user: idUsuario,
        status: 'PENDING',
        products: [{
          idProducto,
          cantidad,
        }]
      });
    }
  }
  await carrito.save();

  res.status(200).json({
    status: 'success',
    data: { carrito },
  });
});

exports.borrarProducto = catchAsync(
  async (req, res) => {
    const { idUsuario, idProducto } = req.params;
    const carritos = await ShoppingCart.find({
      user: idUsuario,
    });
    if (carritos.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
      });
    }
    const carrito = carritos.find((carrito) => carrito.status === 'PENDING');
    if (!carrito) {
      return res.status(404).json({
        status: 'Not Found',
      });
    }
    carrito.products = carrito.products.filter((producto) => producto.idProducto !== idProducto);
    await carritos.save();
    res.status(200).json({
      status: 'success',
      data: { carrito },
    });
  }
);

exports.pagarCarrito = catchAsync(async (req, res) => {
  const { idCarrito } = req.params;
  const carrito = await ShoppingCart.findById(idCarrito);
  if (!carrito) return res.status(404).json({
    status: 'Not Found',
  });
  carrito.status = 'PAID';
  res.status(200).json({
    status: 'success',
    data: { carrito },
  });
});
