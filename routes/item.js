const express = require('express');

const router = express.Router();

const mongoDB = require('../controllers/item');

// setData
router.post('/setdata', async (req, res) => {
  const msg = await mongoDB.setData();
  res.send(JSON.stringify(msg));
});

// getData
router.get('/:contentId', async (req, res) => {
  // req.params.contentId = parseInt(req.params.contentId);
  // const data = await mongoDB.incViews(res.params.contentId);
  contentId = req.params.contentId;
  const data = await mongoDB.incViews(contentId);
  res.send(JSON.stringify(data));
});

// 조회수 + 1
// router.post('/incview/:contentId', async (req, res) => {
//   req.params.contentId = parseInt(req.params.contentId);
//   const msg = await mongoDB.incViews(res.params.contentId);
//   res.send(msg);
// });

// 좋아요 + 1
router.post('/inclike', async (req, res) => {
  const msg = await mongoDB.incLike();
  res.send(msg);
});

// 좋아요 - 1
router.post('/deletelike', async (req, res) => {
  const msg = await mongoDB.deleteLike();
  res.send(msg);
});

// // setView
// router.post('/setView', async (req, res) => {
//   const msg = await mongoDB.setView();
//   res.send(JSON.stringify(msg));
// });

// // setLikes
// router.post('/setLikes', async (req, res) => {
//   const msg = await mongoDB.setLikes();
//   res.send(JSON.stringify(msg));
// });

// // item 불러오기
// router.get('/', async (req, res) => {
//   const data = await mongoDB.getItem();
//   res.send(data);
// });

// // 조회수 불러오기
// router.get('/counts', async (req, res) => {
//   const counts = await mongoDB.getCounts();
//   res.send(counts);
// });

// // 조회수 1 추가
// router.post('/inccounts', async (req, res) => {
//   const msg = await mongoDB.incCounts();
//   res.send(msg);
// });

// // 좋아요 불러오기
// router.get('/likes', async (req, res) => {
//   const likes = await mongoDB.getLikes();
//   res.send(likes);
// });

// // 좋아요 1 추가
// router.post('/inccounts', async (req, res) => {
//   const msg = await mongoDB.incLikes();
//   res.send(msg);
// });

// // 좋아요 1 감소
// router.post('/inccounts', async (req, res) => {
//   const msg = await mongoDB.deleteLikes();
//   res.send(msg);
// });

module.exports = router;
