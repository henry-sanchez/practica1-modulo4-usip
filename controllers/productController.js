const { readData, writeData } = require('../common/lib');

// Handlers
exports.obtenerProductos = (req, res) => {
  const products = readData();
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: products.length,
    data: { products },
  });
};

exports.agregarProducto = (req, res) => {
  const products = readData();
  products.push(req.body);
  writeData(products);
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: { products },
  });
};

exports.obtenerProductoId = (req, res) => {
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

exports.borrarProductoId = (req, res) => {
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

exports.actualizarProductoId = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  let products = readData();
  const index = products.findIndex((item) => item.id === +id);
  if (index < 0)
    return res.status(404).json({
      status: 'Not Found',
    });
  products[index].name = body.name ?? products[index].name;
  products[index].price = body.price ?? products[index].price;
  products[index].category = body.category ?? products[index].category;
  writeData(products);
  res.status(200).json({
    status: 'success',
  });
};
