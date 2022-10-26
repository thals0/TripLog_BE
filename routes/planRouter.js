const express = require('express');

const router = express.Router();

const mongoDB = require('../controlloers/plan');

router.post('/', async (req, res) => {
  const data = await mongoDB.savePlan(req.body);

  res.send(JSON.stringify(data));
});

module.exports = router;