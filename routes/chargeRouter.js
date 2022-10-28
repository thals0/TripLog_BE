const express = require('express');

const router = express.Router();

const mongoDB = require('../controllers/charge');

// 금액 요청(GET)
router.get('/', async (req, res) => {
  const data = await mongoDB.getCharge();
  res.send(JSON.stringify(data));
});

// 금액 만들기(POST)
router.post('/write', async (req, res) => {
  const data = await mongoDB.postCharge();
  res.send(JSON.stringify(data));
});

// 금액 업데이트(POST)
router.post('/update', async (req, res) => {
  console.log(req.body);
  const data = await mongoDB.saveCharge(req.body);
  res.send(JSON.stringify(data));
});

module.exports = router;
