const express = require('express');

const router = express.Router();

const mongoDB = require('../controlloers/review');

// 리뷰 요청(GET)
router.get('/', async (req, res) => {
  const data = await mongoDB.getReview();

  res.send(JSON.stringify(data));
});

// 리뷰 작성(POST)
router.post('/write', async (req, res) => {
  const data = await mongoDB.saveReview(req.body);

  res.send(JSON.stringify(data));
});

module.exports = router;