const express = require('express');

const app = express();

/* dotenv */
require('dotenv').config();

const PORT = process.env.PORT;

// /* passport */
// const passport = require('passport');

// /* passport session */
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* cors */
const cors = require('cors');
app.use(cors());

/* plan */
const planRouter = require('./routes/planRouter');
app.use('/plan', planRouter);

/* review */
const reviewRouter = require('./routes/reviewRouter');
app.use('/review', reviewRouter);

/* charge */
const chargeRouter = require('./routes/chargeRouter');
app.use('/charge', chargeRouter);

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