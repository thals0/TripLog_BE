const express = require('express');

const router = express.Router();

const mongoDB = require('../controllers/plan');

// 내 여행 저장
router.post('/', async (req, res) => {
  const data = await mongoDB.savePlan(req.body);
  res.send(JSON.stringify(data));
});

// 내 여행 불러오기
router.post('/getplan', async (req, res) => {
  // console.log(req.body);
  const data = await mongoDB.getPlan(req.body);
  res.send(JSON.stringify(data));
});

// 내 여행 수정

module.exports = router;
