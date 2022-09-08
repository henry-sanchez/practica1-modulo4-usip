const { Product } = require('../models');

// Handlers
exports.obtenerProductos = async (req, res) => {
  const products = await Product.findAll();
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: products.length,
    data: { products },
  });
};

exports.agregarProducto = async (req, res) => {
  let newProduct = Product.build(req.body);
  newProduct = await newProduct.save();
  res.status(200).json({
    status: 'success',
    data: { product: newProduct },
  });
};

exports.obtenerProductoId = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product)
    return res.status(404).json({
      status: 'Not Found',
    });
  res.status(200).json({
    status: 'success',
    data: { product },
  });
};

exports.borrarProductoId = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product)
    return res.status(404).json({
      status: 'Not Found',
    });
  await Product.destroy({ where: { id } });
  res.status(200).json({
    status: 'success',
  });
};

exports.actualizarProductoId = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const product = await Product.findByPk(id);
  if (!product)
    return res.status(404).json({
      status: 'Not Found',
    });
  product.productName = body.productName || product.productName;
  product.price = body.price || product.price;
  product.description = body.description || product.description;
  await product.save();
  res.status(200).json({
    status: 'success',
  });
};
