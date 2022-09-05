const { readData, writeData } = require('../common/lib');

// Handlers
exports.getAllProducts = (req, res) => {
  const products = readData();
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: products.length,
    data: { products },
  });
};

exports.addNewProduct = (req, res) => {
  const products = readData();
  products.push(req.body);
  writeData(products);
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: { products },
  });
};

exports.getProductById = (req, res) => {
  const { id } = req.params;
  const products = readData();
  const product = products.find((item) => item.id === +id);
  if (!product)
    return res.status(404).json({
      status: 'Not Found',
    });
  res.status(200).json({
    status: 'success',
    data: { product },
  });
};

exports.deleteProductById = (req, res) => {
  const { id } = req.params;
  let products = readData();
  const product = products.find((item) => item.id === +id);
  if (!product)
    return res.status(404).json({
      status: 'Not Found',
    });
  writeData(products.filter((i) => i.id != id));
  res.status(200).json({
    status: 'success',
  });
};