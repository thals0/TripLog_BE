const express = require('express');

const app = express();

/* dotenv */
require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* express-session */
const session = require('express-session');

/* passport */
const passport = require('passport');

app.use(
  session({
    secret: 'thals',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

/* passport session */
app.use(passport.initialize());
app.use(passport.session());

/* cors */
const cors = require('cors');
app.use(cors());

// const main = require('./routes');
const users = require('./routes/users');
const checklist = require('./routes/checklist');
const items = require('./routes/item');

// app.use('/', main);
app.use('/users', users);
app.use('/checklist', checklist);
app.use('/items', items);

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
