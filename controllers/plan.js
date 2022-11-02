const mongoClient = require('../routes/mongo');

// _여러번 실행되는 걸 막음
const _client = mongoClient.connect();

const initState = {
  user: 'test',
  isLogin: true, // 로그인 끝내고 false로 바꾸기
  planDate: {
    startDate: '2022.11.23',
    endDate: '2022.11.24',
    period: [1, 2],
  },
  planItems: [
    [
      { title: '수목원', img: 'firstimg', mapx: '값', mapy: '값' },
      { title: '00맛집', img: 'firstimg', mapx: '값', mapy: '값' },
    ],
    [
      { title: '수목원', img: 'firstimg', mapx: '값', mapy: '값' },
      { title: '수목원', img: 'firstimg', mapx: '값', mapy: '값' },
    ],
  ],
  planDateIdx: 0,
  list: [],
};

const planDB = {
  savePlan: async (list) => {
    const client = await _client;
    const db = client.db('triplog').collection('plans');
    const plan = await db.insertOne(list);
    if (plan.acknowledged) {
      return true;
    } else {
      throw new Error('통신이상');
    }
  },
};

module.exports = planDB;
