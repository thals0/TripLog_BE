const express = require('express');

const router = express.Router();

const mongoDB = require('../controllers/detail');

// getData
router.get('/:contentId', async (req, res) => {
  contentId = req.params.contentId;
  const data = await mongoDB.getData(contentId);
  res.send(JSON.stringify(data));
});

// 좋아요 + 1
router.post('/inclike/:contentId', async (req, res) => {
  contentId = req.params.contentId;
  const msg = await mongoDB.incLike(contentId);
  res.send(msg);
});

// 좋아요 - 1
router.post('/deletelike/:contentId', async (req, res) => {
  contentId = req.params.contentId;
  const msg = await mongoDB.deleteLike(contentId);
  res.send(msg);
});

module.exports = router;
