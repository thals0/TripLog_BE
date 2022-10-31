const express = require('express');

const router = express.Router();

const mongoDB = require('../controllers/review');

const multer = require('multer');

const fs = require('fs');

const dir = './uploads';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now());
  },
});

const limits = {
  fileSize: 1024 * 1024 * 2,
};

const upload = multer({ storage, limits });

// 리뷰 요청(GET)
router.get('/:contentId', async (req, res) => {
  req.params.contentId = parseInt(req.params.contentId);
  // 여기서 getRiview 메소드를 호출 할 때 getReivew() 의 인자로 req.params.contentsId 를 넘겨주기
  const data = await mongoDB.getReview(req.params.contentId);
  res.send(JSON.stringify(data));
});

// 리뷰 작성(POST)
router.post('/write', async (req, res) => {
  const data = await mongoDB.saveReview(req.body);
  res.send(JSON.stringify(data));
});

// 리뷰 작성 IMG (POST)
// router.post('/img', upload.single('img'), async (req, res) => {
//   if (!fs.existsSync(dir)) fs.mkdirSync(dir);
//   res.send(JSON.stringify(req.file.filename));
// });

// 리뷰 수정(GET)
router.get('/emend/:_id', async (req, res) => {
  const data = await mongoDB.getEmendReview(req.params._id);
  res.send(JSON.stringify(data));
});

// 리뷰 수정(POST)
router.post('/emend/:_id', async (req, res) => {
  console.log(req.body)
  const data = await mongoDB.postEmendReview(req.body);
  res.send(JSON.stringify(data));
});

// 리뷰 삭제(DELETE)
router.delete('/delete/:_id', async (req, res) => {
  const data = await mongoDB.deleteReview(req.params._id);
  res.send(JSON.stringify(data));
});

module.exports = router;
