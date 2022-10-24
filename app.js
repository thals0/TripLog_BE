const express = require('express');

const app = express();

/* dotenv */
require('dotenv').config();

const PORT = process.env.PORT;

/* express-session */
const session = require('express-session');

/* passport */
const passport = require('passport');

app.use(
    session({
        secret: 'JUNU',
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* cors */
const cors = require('cors');
app.use(cors());

const router = require('./routes/test');
app.use('/', router);

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
    