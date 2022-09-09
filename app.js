const express = require("express");
const morgan = require("morgan");
const productRouter = require('./routers/productRoutes');
const MyError = require('./utils/MyError');

const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// routes
app.use('/api/v1/products', productRouter);

app.all('*', (req, res, next) => {
  next(new MyError('route not found', 404));
});

// recibimos como primer parámetro instancia de MyError
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: 'err.message',
    });
  }
});

module.exports = app;