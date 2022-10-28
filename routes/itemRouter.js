const express = require('express');

const router = express.Router();

const mongoDB = require('../controllers/items');

router.get('/:contentId', async (req, res) => {
  req.params.contentId = parseInt(req.params.contentId);
  const data = await mongoDB.getItem();
  res.send(JSON.stringify(data));
});

module.exports = router;
