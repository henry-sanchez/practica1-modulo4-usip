const { readFileSync, writeFileSync } = require('fs');

// Handlers
exports.getAllProducts = (req, res) => {
  const products = JSON.parse(readFileSync(`${__dirname}/../data/products.json`, 'utf8'));
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: products.length,
    data: { products },
  });
};

exports.addNewProduct = (req, res) => {
  const products = JSON.parse(readFileSync(`${__dirname}/../data/products.json`, 'utf8'));
  products.push(req.body);
  writeFileSync(`${__dirname}/data/products.json`, JSON.stringify(products));
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: { products },
  });
};

exports.getProductById = (req, res) => {
  const { id } = req.params;
  const products = JSON.parse(readFileSync(`${__dirname}/../data/products.json`, 'utf8'));
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
  if (!id) return res.status(400).json({status: 'BadRequest'});
  let products = JSON.parse(readFileSync(`${__dirname}/../data/products.json`, 'utf8'));
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