const express = require('express');
const router = express.Router();
const { Specification, SpecificationSection, ReqsToSection } = require('../models');
const verify = require('./middleware');

router.use(verify);

router.get('/', async (req, res) => {
  try {
    if (req.query.project) {
      const data = await Specification.findAll({ where: { project: req.query.project } });
      return res.status(200).json(data);
    } else if (req.query.specificationID) {
      let spec = await Specification.findOne({
        where: { id: req.query.specificationID },
        raw: true,
      });
      if (!spec) {
        return res.status(404).json({ error: 'Specification not found' });
      }
      let specSections = await SpecificationSection.findAll({
        where: { specificationID: spec.id },
        order: [['position']],
        raw: true,
      });
      const sectionsIds = specSections.map(element => element.id);
      const reqs = await ReqsToSection.findAll({
        where: {
          sectionID: sectionsIds,
        },
        include: 'Requirement',
        raw: true,
        nest: true,
      });
      reqs.forEach(req => {
        let tempsection = specSections.find(section => section.id == req.sectionID);
        if (!tempsection.requirements) {
          tempsection.requirements = [];
        }
        tempsection.requirements.push(req.Requirement);
      });
      if (req.query.hierarchical === 'true') {
        let firstLevelSections = specSections.filter(
          section => section.position.split('.').length == 1
        );
        let secondLevelSections = specSections.filter(
          section => section.position.split('.').length == 2
        );
        secondLevelSections = secondLevelSections.map(section => {
          section.subsections = specSections.filter(sec =>
            sec.position.startsWith(section.position + '.')
          );
          return section;
        });
        firstLevelSections = firstLevelSections.map(section => {
          section.subsections = secondLevelSections.filter(
            sec =>
              sec.position.startsWith(section.position + '.') && sec.position.split('.').length == 2
          );
          return section;
        });
        specSections = firstLevelSections;
      }
      return res.status(200).json({ ...spec, sections: specSections });
    } else if (!req.query.project && !req.query.specificationID) {
      return res.status(400).json({ error: 'You should specify projectID or specificationID' });
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

router.post('/', async (req, res) => {
  let { title, sections, author, project } = req.body;
  let result = await Specification.create({ title: title, author: author, project: project });
  for (const section of sections) {
    const createdSection = await SpecificationSection.create({
      ...section,
      specificationID: result.id,
    });
    if (section.requirements && section.requirements.length > 0) {
      for (const reqID of section.requirements) {
        await ReqsToSection.create({ sectionID: createdSection.id, requirementID: reqID });
      }
    }
  }
  return res.status(200).json(result);
});

module.exports = router;
