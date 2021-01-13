const express = require('express');
const router = express.Router();
const { Status } = require('../models');
const verify = require('./middleware');

router.use(verify);

router.get('/statuses', async (req, res) => {
  try {
    let data = await Status.findAll({ raw: true });
    data = data.map(status => status.status);
    res.status(200).json({ statuses: data });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
