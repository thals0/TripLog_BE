const express = require('express');

const router = express.Router();

const mongoDB = require('../controllers/detail');

// get all data
router.get('/', async (req, res) => {
  const data = await mongoDB.getAlldata();
  res.send(data);
});

// router.post('/tourdata', async (req, res) => {
//   const data = await mongoDB.getTourdata(req.body);
//   console.log(req.body)
//   res.send(data);
// });

// getData
router.post('/:contentId', async (req, res) => {
  contentId = req.params.contentId;
  // console.log(req.body);
  const data = await mongoDB.getData(req.body, contentId);
  res.send(JSON.stringify(data));
});

// 좋아요 + 1;
router.post('/inclike/:contentId', async (req, res) => {
  contentId = req.params.contentId;
  const msg = await mongoDB.incLike(contentId);
  res.send(msg);
});

// 좋아요 - 1;
router.post('/deletelike/:contentId', async (req, res) => {
  contentId = req.params.contentId;
  const msg = await mongoDB.deleteLike(contentId);
  res.send(msg);
});

module.exports = router;
