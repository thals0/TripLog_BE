const { ObjectId } = require('mongodb');
const mongoClient = require('../mongo');

// _여러번 실행되는 걸 막음
const _client = mongoClient.connect();

const detailDB = {
  // 리뷰 요청(GET)
  getDetail: async (contentId) => {
    const client = await _client;
    const db = client.db('triplog').collection('item');
    

  },
}

module.exports = detailDB;