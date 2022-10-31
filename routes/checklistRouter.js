const express = require('express');

const router = express.Router();

const mongoDB = require('../controllers/checklist');

// setData
router.post('/setData', async (req, res) => {
  const msg = await mongoDB.setData();
  res.send(JSON.stringify(msg));
});

// item 불러오기
router.post('/', async (req, res) => {
  const data = await mongoDB.getItem(req.body);
  // console.log(req.body);
  res.send(data);
});

// item 추가
router.post('/addItem', async (req, res) => {
  const data = await mongoDB.addItem(req.body);
  res.send(JSON.stringify(data));
});

// checked 변경
router.post('/checked', async (req, res) => {
  const msg = await mongoDB.checkedItem(req.body);
  res.send(msg);
});

// item 삭제
router.delete('/deleteItem', async (req, res) => {
  const data = await mongoDB.deleteItem(req.body);
  // console.log(req.body);
  res.send(data);
});

module.exports = router;
