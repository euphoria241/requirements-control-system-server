const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verify = require('./middleware');

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    role: 'admin',
  },
  {
    id: 2,
    username: 'user',
    password: 'user',
    role: 'user',
  },
];
router.post('/login', async (req, res) => {
  let user = users.find(
    user => user.username == req.body.username && user.password == req.body.password
  );
  if (!user) return res.status(400).send('Invalid email or password!');
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  res
    .header('authorization', token)
    .json({ token, id: user.id, username: user.username, role: user.role });
});

router.get('/users', verify, async (req, res) => {
  let us = users.map(user => {
    return { id: user.id, username: user.username, role: user.role };
  });
  res.status(200).json(us);
});

module.exports = router;
