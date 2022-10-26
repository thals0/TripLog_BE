const express = require('express');

const router = express.Router();

const mongoDB = require('../controllers/item');

// setView
router.post('/setView', async (req, res) => {
  const msg = await mongoDB.setView();
  res.send(JSON.stringify(msg));
});

// setLikes
router.post('/setLikes', async (req, res) => {
  const msg = await mongoDB.setLikes();
  res.send(JSON.stringify(msg));
});

// item 불러오기
router.get('/', async (req, res) => {
  const data = await mongoDB.getItem();
  res.send(data);
});

// 조회수 불러오기
router.get('/counts', async (req, res) => {
  const counts = await mongoDB.getCounts();
  res.send(counts);
});

// 조회수 1 추가
router.post('/inccounts', async (req, res) => {
  const msg = await mongoDB.incCounts();
  res.send(msg);
});

// 좋아요 불러오기
router.get('/likes', async (req, res) => {
  const likes = await mongoDB.getLikes();
  res.send(likes);
});

// 좋아요 1 추가
router.post('/inccounts', async (req, res) => {
  const msg = await mongoDB.incLikes();
  res.send(msg);
});

// 좋아요 1 감소
router.post('/inccounts', async (req, res) => {
  const msg = await mongoDB.deleteLikes();
  res.send(msg);
});

module.exports = router;
