const mongoClient = require('../routes/mongo');

const _client = mongoClient.connect();

const checkDB = {
  getAlldata: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('detail');
    const data = await db.find({}).toArray();
    return data;
  },

  // getTourdata: async (tourData) => {
  //   const client = await _client;
  //   const db = client.db('triplog').collection('detail');
  //   const find = await db.findOne({ contentId: tourData.contentId });
  //   if (find === null) {
  //     const insertRes = await db.insertOne({ tourData });
  //     if (insertRes.acknowledged) {
  //       return insertRes;
  //     } else {
  //       throw new Error('통신 이상');
  //     }
  //   } else {
  //     return find;
  //   }
  // },

  // 조회수 +1
  getData: async ({ data }) => {
    const client = await _client;
    const db = client.db('triplog').collection('detail');
    const findResult = await db.findOne({
      'data.contentId': data.contentId,
    });
    console.log(findResult);
    if (findResult) {
      const result = await db.updateOne(
        { 'data.contentId': data.contentId },
        { $inc: { view: +1 } }
      );
      if (result.acknowledged) {
        return findResult;
      } else {
        throw new Error('통신 이상');
      }
    } else {
      const insertRes = await db.insertOne({
        data,
        view: 1,
        like: 0,
      });
      console.log('@', insertRes);
      if (insertRes.acknowledged) {
        return insertRes;
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
