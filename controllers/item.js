const mongoClient = require('../routes/mongo');

const _client = mongoClient.connect();

// const initState = {
//   contentid: '1860239',
//   counts: 0,
//   likes: 0,
// };

// const viewsInit = {
//   contentid: '1860239',
//   views: 0,
//   userId: 'thals',
// };

// const likesInit = {
//   contentid: '1860239',
//   likes: 0,
//   userId: 'thals',
// };

const initState = { _id: 3, contentid: '1860239', view: 0, like: 0 };
// likes -> 유저 컬랙션에서 받아오기

const checkDB = {
  // 초기 데이터 설정
  setData: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('item');
    const result = await db.insertOne(initState);
    if (result.acknowledged) {
      return '업데이트 성공';
    } else {
      throw new Error('통신 이상');
    }
  },
  // 데이터 가져오기
  getData: async (contentId) => {
    const client = await _client;
    const db = client.db('triplog').collection('item');
    const data = await db
      .find({
        contentId: contentId.toString(),
      })
      .toArray();
    return data;
  },
  // 조회수 +1
  incViews: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('item');
    const result = await db.updateOne(
      { contentId: '1860239' },
      { $inc: { view: +1 } }
    );
    if (result.acknowledged) {
      return '조회수 + 1';
    } else {
      throw new Error('통신 이상');
    }
  },
  // 좋아요 +1
  incLike: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('item');
    const result = await db.updateOne(
      { contentId: '1860239' },
      { $inc: { like: +1 } }
    );
    if (result.acknowledged) {
      return '좋아요 + 1 업데이트 성공';
    } else {
      throw new Error('통신 이상');
    }
  },
  // 좋아요 -1
  deleteLike: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('item');
    const result = await db.updateOne(
      { contentId: '1860239' },
      { $inc: { like: -1 } }
    );
    if (result.acknowledged) {
      return '좋아요 -1';
    } else {
      throw new Error('통신 이상');
    }
  },
};

// const checkDB = {
//   // 제일 처음 set data
//   setView: async () => {
//     const client = await _client;
//     const db = client.db('triplog').collection('views');
//     const result = await db.insertOne(viewsInit);
//     if (result.acknowledged) {
//       return '조회수 초기 상태 업데이트 성공';
//     } else {
//       throw new Error('통신 이상');
//     }
//   },

//   setLikes: async () => {
//     const client = await _client;
//     const db = client.db('triplog').collection('likes');
//     const result = await db.insertOne(likesInit);
//     if (result.acknowledged) {
//       return '좋아요 초기 상태 업데이트 성공';
//     } else {
//       throw new Error('통신 이상');
//     }
//   },

//   // item 불러오기
//   getItem: async () => {
//     const client = await _client;
//     const db = client.db('triplog').collection('item');
//     const data = await db.find({}).toArray();
//     return data;
//   },

//   // 조회수 불러오기
//   getViews: async () => {
//     const client = await _client;
//     const db = client.db('triplog').collection('views');
//     const data = await db.find({}).toArray();
//     return data;
//   },

//   // 조회수 1 추가
//   incViews: async () => {
//     const client = await _client;
//     const db = client.db('triplog').collection('views');
//     const result = await db.updateOne({ _id: 1 }, { $inc: { counts: +1 } });
//     if (result.acknowledged) {
//       return '조회수 +1 성공';
//     } else {
//       throw new Error('통신 이상');
//     }
//   },

//   // 좋아요 불러오기
//   getLikes: async () => {
//     const client = await _client;
//     const db = client.db('triplog').collection('likes');
//     const data = await db.find({}).toArray();
//     return data;
//   },

//   // 좋아요 +1
//   incLikes: async () => {
//     const client = await _client;
//     const db = client.db('triplog').collection('likes');
//     const result = await db.updateOne(
//       { contentid: '' },
//       { $inc: { likes: +1 } }
//     );
//     if (result.acknowledged) {
//       return '좋아요 +1 성공';
//     } else {
//       throw new Error('통신 이상');
//     }
//   },

//   // 좋아요 -1
//   deleteLikes: async () => {
//     const client = await _client;
//     const db = client.db('triplog').collection('likes');
//     const result = await db.updateOne(
//       { contentid: '' },
//       { $inc: { likes: -1 } }
//     );
//     if (result.acknowledged) {
//       return '좋아요 -1 성공';
//     } else {
//       throw new Error('통신 이상');
//     }
//   },
// };

module.exports = checkDB;
