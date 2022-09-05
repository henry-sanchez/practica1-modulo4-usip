const { readFileSync, writeFileSync } = require('fs');
const pathFile = `${__dirname}/../data/products.json`;

exports.readData = () => {
  return JSON.parse(readFileSync(pathFile, 'utf8'));
};

exports.writeData = (products) => {
  writeFileSync(pathFile, JSON.stringify(products));
  return;
};