const express = require('express');

const router = express.Router();

const mongoDB = require('../controlloers/user');

router.get('/', async (req, res) => {
  const data = await mongoDB.getUser();

  res.send (JSON.stringify(data));
});

module.exports = router;