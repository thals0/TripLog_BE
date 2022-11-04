const { ObjectId } = require('mongodb');
const mongoClient = require('../routes/mongo');

// _여러번 실행되는 걸 막음
const _client = mongoClient.connect();

const reviewDB = {
  getUserReview: async ({ nickName }) => {
    const client = await _client;
    const db = client.db('triplog').collection('reviews');
    const data = await db.find({ nickName: nickName }).toArray();
    return data;
  },

  // 리뷰 전체 요청
  getAlldata: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('reviews');
    const data = await db.find({}).toArray();
    return data;
  },

  // 리뷰 요청(GET)
  getReview: async (contentId) => {
    const client = await _client;
    const db = client.db('triplog').collection('reviews');

    const data = await db
      .find({ contentId: contentId.toString() })
      .sort({ _id: -1 })
      .toArray();
    return data;
  },

  // 리뷰 작성(POST)
  saveReview: async (review) => {
    const client = await _client;
    const db = client.db('triplog').collection('reviews');

    const contentId = review[0].contentId;
    const content = review[0].content;
    const nickName = review[0].nickName;
    const star = review[0].star;
    const img = review[0].img;
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const dateFull =
      year + '.' + month + '.' + day + ' ' + hours + ':' + minutes;

    const saveReview = {
      contentId,
      nickName,
      content,
      star,
      dateFull,
      img,
    };
    const plan = await db.insertOne(saveReview);

    if (plan.acknowledged) {
      return true;
    } else {
      throw new Error('통신이상');
    }
  },

  // 리뷰 수정(GET)
  getEmendReview: async (_id) => {
    const client = await _client;
    const db = client.db('triplog').collection('reviews');
    const data = await db.findOne({ _id: ObjectId(_id) });
    return data;
  },

  // 리뷰 수정(POST)
  postEmendReview: async (emendData) => {
    const contentId = emendData[0].emendId;
    const content = emendData[0].emendContent;
    const nickName = emendData[0].nickName;

    const client = await _client;
    const db = client.db('triplog').collection('reviews');
    const data = await db.updateOne(
      { _id: ObjectId(contentId), nickName: nickName },
      {
        $set: {
          content: content,
        },
      }
    );

    if (data.acknowledged) {
      return true;
    } else {
      throw new Error('통신이상');
    }
  },

  // 리뷰 삭제(DELETE)
  deleteReview: async (_id) => {
    const client = await _client;
    const db = client.db('triplog').collection('reviews');
    const review = await db.deleteOne({ _id: ObjectId(_id) });

    if (review.acknowledged) {
      return true;
    } else {
      throw new Error('통신이상');
    }
  },
};

module.exports = reviewDB;
