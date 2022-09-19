const ShoppingCart = require('../models/ShoppingCart');
const catchAsync = require('../utils/catchAsync');

// Handlers
exports.listarCarritos = catchAsync(async (req, res) => {
  const carts = await ShoppingCart.find();

  res.status(200).json({
    status: 'success',
    results: carts.length,
    data: { carts },
  });
});

exports.listarCarritosPorUsuario = catchAsync(async (req, res) => {
  const idUser = req.user._id;
  const carts = await ShoppingCart.find({ user: idUser });

  res.status(200).json({
    status: 'success',
    results: carts.length,
    data: { carts },
  });
});

exports.crearCarrito = catchAsync(async (req, res) => {
  const idUser = req.user._id;
  const { idProduct, amount, price } = req.body;
  let cart = (await ShoppingCart.find({
    user: idUser,
    status: 'PENDING'
  })).pop();
  if (!cart) {
    cart = new ShoppingCart({
      user: idUser,
      status: 'PENDING',
      products: [{
        idProduct,
        amount,
        price,
      }]
    });
  } else {
    cart.products.push({
      idProduct,
      amount,
      price,
    });
  }
  await cart.save();

  res.status(200).json({
    status: 'success',
    data: { cart },
  });
});

exports.borrarProducto = catchAsync(
  async (req, res) => {
    const { idProduct } = req.params;
    const idUser = req.user._id;
    const cart = (await ShoppingCart.find({
      user: idUser,
      status: 'PENDING',
    })).pop();
    if (!cart) {
      return res.status(404).json({
        status: 'Not Found',
      });
    }
    cart.products = cart.products.filter((item) => item.idProduct !== idProduct);
    await cart.save();
    res.status(200).json({
      status: 'success',
      data: { cart },
    });
  }
);

exports.pagarCarrito = catchAsync(async (req, res) => {
  const { idCart } = req.params;
  const cart = await ShoppingCart.findById(idCart);
  if (!cart) return res.status(404).json({
    status: 'Not Found',
  });
  if (cart.products.length === 0) return res.status(400).json({
    status: 'Bad Request, no products in shopping cart',
  });
  cart.status = 'PAID';
  await cart.save();
  res.status(200).json({
    status: 'success',
    data: { cart },
  });
});
