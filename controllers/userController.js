const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

// Handlers
exports.agregarUsuario = catchAsync(async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(200).json({
    status: 'success',
    data: { user },
  });
});
