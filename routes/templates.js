const express = require('express');
const router = express.Router();
const { SpecificationTemplate, TemplateSection } = require('../models');
const verify = require('./middleware');

router.use(verify);

router.get('/', async (req, res) => {
  if (req.query.templateID) {
    console.log(req.query);
    console.log(req.query.templateID);
    const data = await TemplateSection.findAll({ where: { templateID: req.query.templateID } });
    return res.status(200).json(data);
  } else {
    const data = await SpecificationTemplate.findAll();
    return res.status(200).json(data);
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await SpecificationTemplate.create({ name: req.body.title });
    for (const section of req.body.sections) {
      await TemplateSection.create({ ...section, templateID: result.id });
    }
    return res.status(200).json({ succes: 'successfully created template and sections' });
  } catch (err) {
    return res.status(400).json({ error: err.parent.sqlMessage });
  }
});

router.delete('/', async (req, res) => {
  try {
    await TemplateSection.destroy({
      where: { templateID: req.body.id },
    });
    const deletedTemplate = await SpecificationTemplate.destroy({
      where: { id: req.body.id },
    });
    if (deletedTemplate) {
      return res.status(200).json({ result: 'success' });
    }
    throw new Error('Template not found');
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

module.exports = router;
