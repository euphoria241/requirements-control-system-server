const express = require('express');
const router = express.Router();
const verify = require('./middleware');

router.use(verify);
router.get('/', (req, res) => {
  res.status(200).json([
    {
      id: 1,
      title: 'Система управления требованиями',
      description: 'blablabla',
      createdAt: '20-05-2020 13:55:55',
    },
    {
      id: 2,
      title: 'Система управления проектами',
      description: 'blablabla',
      createdAt: '20-05-2020 13:55:55',
    },
    {
      id: 3,
      title: 'Система тестирования',
      description: 'blablabla',
      createdAt: '20-05-2020 13:55:55',
    },
    {
      id: 4,
      title: 'Картографическая система',
      description: 'blablabla',
      createdAt: '20-05-2020 13:55:55',
    },
    {
      id: 5,
      title: 'Система визуализации данных',
      description: 'blablabla',
      createdAt: '20-05-2020 13:55:55',
    },
    {
      id: 6,
      title: 'Система обработки потоковых данных',
      description: 'blablabla',
      createdAt: '20-05-2020 13:55:55',
    },
  ]);
});

module.exports = router;
