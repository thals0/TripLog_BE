const mongoClient = require('../mongo');

// _여러번 실행되는 걸 막음
const _client = mongoClient.connect();

const reviewDB = {
  // 리뷰 요청(GET)
  getReview: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('reviews');
    const data = await db.find({}).toArray();
    return data;
  },
  
  // 리뷰 작성(POST)
  saveReview: async (review) => {
    const client = await _client;
    const db = client.db('triplog').collection('reviews');
    
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const time = hours + ':' + minutes;
    const dateFull = year + '.' + month + '.' + day + ' ' + hours + ':' + minutes;

    const saveReview = {
      review,
      time,
      dateFull,
      view: 0,
      star: 0,
    }
    const plan = await db.insertOne(saveReview);
    
    if(plan.acknowledged) {
      return true;
    } else {
      throw new Error ('통신이상');
    };
  }
};

module.exports = reviewDB;