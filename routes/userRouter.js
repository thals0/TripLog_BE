const express = require('express');

const router = express.Router();

const mongoDB = require('../controllers/user');

router.get('/getlikes', async (req, res) => {
  const data = await mongoDB.getLikes();
  res.send(data);
});

router.post('/arrlike', async (req, res) => {
  const data = await mongoDB.arrLike(req.body);
  res.send(JSON.stringify(data));
});

// 각 주소에 따른 라우팅 처리
// 회원가입, 로그인은 전부 컨트롤러에서 처리되고 있으니
// 컨트롤러에서 값을 받아서 전달하는 역할을 함
router.post('/register', async (req, res) => {
  const registerInfo = req.body[0];
  const result = await mongoDB.register(registerInfo);
  res.send(JSON.stringify(result));
});

router.post('/login', async (req, res) => {
  const loginInfo = req.body;
  const result = await mongoDB.login(loginInfo);
  res.send(JSON.stringify(result));
});

module.exports = router;
