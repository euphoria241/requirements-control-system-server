const express = require('express');
const router = express.Router();
const { Requirement } = require('../models');
const verify = require('./middleware');

router.use(verify);

router.get('/', async (req, res) => {
  if (req.query.requirementID) {
    const data = await Requirement.findOne({ where: { id: req.query.requirementID }, raw: true });
    if (data.status == 'Выполнено') {
      res.status(200).json({ evaluation: true });
      return;
    }
    let evaluation = Math.floor(Math.random() * Math.floor(2));
    res.status(200).json({ evaluation: !!evaluation });
  } else {
    res.status(400).json({ error: 'Bad request' });
  }
});

module.exports = router;
