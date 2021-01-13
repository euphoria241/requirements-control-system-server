const express = require('express');
const cors = require('cors');
const db = require('./models');
const dotenv = require('dotenv');

const { Type, Priority, Status } = require('./models');
const requirementRoutes = require('./routes/requirements');
const projectRoutes = require('./routes/projects');
const specRoutes = require('./routes/specifications');
const specTemplates = require('./routes/templates');
const testsMock = require('./routes/tests');
const meta = require('./routes/metaInfo');
const login = require('./routes/login');

dotenv.config();

const PORT = process.env.PORT || 3939;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', login);
app.use('/requirements', requirementRoutes);
app.use('/projects', projectRoutes);
app.use('/specifications', specRoutes);
app.use('/templates', specTemplates);
app.use('/tests', testsMock);
app.use('/meta', meta);

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

db.sequelize.sync().then(async req => {
  Type.create({
    type: 'Функциональное',
  });
  Type.create({
    type: 'Нефункциональное',
  });
  Priority.create({
    priority: 'Высокий',
  });
  Priority.create({
    priority: 'Средний',
  });
  Priority.create({
    priority: 'Низкий',
  });
  Status.create({
    status: 'Выполнено',
  });
  Status.create({
    status: 'В работе',
  });
  Status.create({
    status: 'Новое',
  });
  Status.create({
    status: 'Отложено',
  });
  app.listen(PORT, console.log(`Listening on ${PORT}`));
});
