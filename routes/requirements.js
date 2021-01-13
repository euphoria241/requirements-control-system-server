const express = require('express');
const router = express.Router();
const { Requirement, ReqsToReq } = require('../models');
const verify = require('./middleware');

router.use(verify);

router.get('/', async (req, res) => {
  if (req.query.project) {
    const data = await Requirement.findAll({ where: { project: req.query.project } });
    return res.status(200).json(data);
  } else if (req.query.reqid) {
    const data = await Requirement.findOne({ where: { id: req.query.reqid }, raw: true });
    if (!data) {
      return res.status(404).send('Requirement not found');
    }
    let relatedReqs = await ReqsToReq.findAll({
      where: { req1ID: req.query.reqid },
      include: 'Requirement',
      raw: true,
      nest: true,
    });
    relatedReqs = relatedReqs.map(req => req.Requirement);
    return res.status(200).json({ ...data, related: relatedReqs });
  } else {
    Requirement.findAll()
      .then(reqs => {
        return res.status(200).send(reqs);
      })
      .catch(err => {
        return res.status(400).send(`Error occured: ${err}`);
      });
  }
});

router.post('/', async (req, res) => {
  let result = await Requirement.create({ ...req.body, status: 'Новое' });
  return res.status(200).json(result);
});
router.put('/', async (req, res) => {
  try {
    const reqID = req.body.id;
    delete req.body.createdAt;
    delete req.body.updatedAt;
    delete req.body.id;

    const [updated] = await Requirement.update(req.body, {
      where: { id: reqID },
    });
    if (updated) {
      const updatedReq = await Requirement.findOne({ where: { id: reqID } });
      return res.status(200).json(updatedReq);
    }
    throw new Error('Requirement not found');
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
router.delete('/', async (req, res) => {
  try {
    const deleted = await Requirement.destroy({
      where: { id: req.body.id },
    });
    if (deleted) {
      return res.status(200).json({ result: 'success' });
    }
    throw new Error('Requirement not found');
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

router.post('/relations', async (req, res) => {
  if (req.body.reqID && req.body.relatedReqs.length > 0) {
    for (const id of req.body.relatedReqs) {
      let row = await ReqsToReq.create({
        req1ID: req.body.reqID,
        req2ID: id,
      });
    }
    let relatedReqs = await ReqsToReq.findAll({
      where: { req1ID: req.body.reqID },
      include: 'Requirement',
      raw: true,
      nest: true,
    });
    relatedReqs = relatedReqs.map(req => req.Requirement);
    return res.status(200).json({ newRelated: relatedReqs });
  }
});
router.delete('/relations', async (req, res) => {
  if (req.body.req1ID && req.body.req2ID) {
    const deleted = await ReqsToReq.destroy({
      where: { req1ID: req.body.req1ID, req2ID: req.body.req2ID },
    });
    if (deleted) {
      return res.status(200).json({ result: 'success', deletedID: req.body.req2ID });
    } else {
      return res.status(404).json({ error: 'Row not found!' });
    }
  } else {
    return res.status(400).json({ error: 'Bad request!' });
  }
});

module.exports = router;
