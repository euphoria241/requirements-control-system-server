const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('authorization');
  if (!token) return res.status(401).send('Acesss denied!');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.send(400).send('Invalid token');
  }
};
