const Product = require('../models/Product');
const catchAsync = require('../utils/catchAsync');

// Handlers
exports.obtenerProductos = catchAsync(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: products.length,
    data: { products },
  });
});

exports.agregarProducto = catchAsync(async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(200).json({
    status: 'success',
    data: { product },
  });
});

exports.obtenerProductoId = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({
        status: 'Not Found',
      });
    res.status(200).json({
      status: 'success',
      data: { product },
    });
  }
);

exports.borrarProductoId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByIdAndDelete(id);
  if (!result) return res.status(404).json({
    status: 'Not Found',
  });
  res.status(200).json({
    status: 'success',
  });
});

exports.actualizarProductoId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const result = await Product.findByIdAndUpdate(id, body, {new: true});
  if (!result) return res.status(404).json({
    status: 'Not Found',
  });
  res.status(200).json({
    status: 'success',
  });
});
