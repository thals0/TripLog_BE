const mongoClient = require('../routes/mongo');

const _client = mongoClient.connect();

const checkDB = {
  // 조회수 +1
  getData: async (contentId) => {
    const client = await _client;
    const db = client.db('triplog').collection('detail');
    const findResult = await db.findOne({ contentId: contentId });
    console.log(contentId);
    if (findResult) {
      const result = await db.updateOne(
        { contentId: contentId },
        { $inc: { view: +1 } }
      );
      if (result.acknowledged) {
        return '조회수 + 1';
      } else {
        throw new Error('통신 이상');
      }
    } else {
      const insertRes = await db.insertOne({
        contentId,
        view: 1,
        like: 0,
      });
      if (insertRes.acknowledged) {
        return 'insert contentId';
      } else {
        throw new Error('통신 이상');
      }
    }
  },
  // 좋아요 +1
  incLike: async (contentId) => {
    const client = await _client;
    const db = client.db('triplog').collection('detail');
    const result = await db.updateOne(
      { contentId: contentId },
      { $inc: { like: +1 } }
    );
    if (result.acknowledged) {
      return '좋아요 + 1 업데이트 성공';
    } else {
      throw new Error('통신 이상');
    }
  },
  // 좋아요 -1
  deleteLike: async (contentId) => {
    const client = await _client;
    const db = client.db('triplog').collection('detail');
    const result = await db.updateOne(
      { contentId: contentId },
      { $inc: { like: -1 } }
    );
    if (result.acknowledged) {
      return '좋아요 -1';
    } else {
      throw new Error('통신 이상');
    }
  },
};

module.exports = checkDB;
