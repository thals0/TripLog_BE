const mongoClient = require('../routes/mongo');

const _client = mongoClient.connect();

// const init = {
//   userId: 'test',
//   likes: [{ contentId: '126081', title: '한라산 (제주도 국가지질공원)' }],
// };

const init = {
  userId: 'test',
  likes: ['126081'],
};

const likeDB = {
  // setData
  setData: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('likes');
    const result = await db.insertOne(init);
    if (result.acknowledged) {
      return '업데이트 성공';
    } else {
      throw new Error('통신 이상');
    }
  },
  // 사용자의 좋아요 항목 가져오기
  getLikes: async ({ nickName }) => {
    const client = await _client;
    const db = client.db('triplog').collection('likes');
    const data = await db.findOne({ userId: nickName });
    return data;
  },
  // 좋아요 아이템 추가
  arrLike: async (like) => {
    console.log(like);
    const client = await _client;
    const db = client.db('triplog').collection('likes');
    const result = await db.updateOne(
      { userId: 'test' },
      { $set: { likes: like } }
    );
    if (result.acknowledged) {
      return like;
    } else {
      throw new Error('통신 이상');
    }
  },
};

module.exports = likeDB;
