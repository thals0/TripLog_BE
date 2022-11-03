const express = require('express');

const app = express();

/* dotenv */
require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 이미지 저장 위치
// app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// 쿠키 parser 로딩 후 app에 등록
const cookieParser = require('cookie-parser');
app.use(cookieParser());

/* 사용안함
// express-session
const session = require('express-session');

// passport
const passport = require('passport');

app.use(
  session({
    secret: 'triplog',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// passport session 
app.use(passport.initialize());
app.use(passport.session());
/*

/* cors */
const cors = require('cors');
app.use(cors());

/* img */
app.use('/uploads', express.static('uploads'));

/* routes */
// plan
const planRouter = require('./routes/planRouter');
app.use('/plan', planRouter);

// review
const reviewRouter = require('./routes/reviewRouter');
app.use('/review', reviewRouter);

// charge
const chargeRouter = require('./routes/chargeRouter');
app.use('/charge', chargeRouter);

// checklist
const checklist = require('./routes/checklistRouter');
app.use('/checklist', checklist);

// detail
const detail = require('./routes/detailRouter');
app.use('/detail', detail);

// user
const user = require('./routes/userRouter');
app.use('/user', user);

// like
const like = require('./routes/likeRouter');
app.use('/like', like);

/* 오류발생 */
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.send(err.message);
});

/* start */
app.listen(PORT, () => {
  console.log(`해당 포트는 ${PORT}에서 작동중 입니다.`);
});
