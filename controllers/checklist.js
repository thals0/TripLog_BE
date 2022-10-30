const mongoClient = require('../routes/mongo');

const _client = mongoClient.connect();

const initState = {
  userId: 'test',
  checked: [],
  items: [
    {
      title: '기본 짐싸기',
      content: [
        '의류',
        '전자기기 챙기기',
        '세안용품',
        '상비약',
        '신분증/면허증',
        '필기구',
        '마스크/손 소독제',
      ],
    },
    {
      title: '필수 준비물',
      content: ['숙소'],
    },
    {
      title: '트립로그에서 챙기기',
      content: ['여행 일정짜기', '가계부 짜기'],
    },
    {
      title: '통신/교통 준비',
      content: ['여행지 교통편'],
    },
    {
      title: '즐길거리 준비',
      content: ['관광 정보 확인하기', '맛집 정보 확인하기'],
    },
  ],
};

const checkDB = {
  // 제일 처음 set data
  setData: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('checklist');
    const result = await db.insertOne(initState);
    if (result.acknowledged) {
      return '업데이트 성공';
    } else {
      throw new Error('통신 이상');
    }
  },
  // item 불러오기
  getItem: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('checklist');
    const data = await db.find({}).toArray();
    return data;
  },
  // item 추가
  addItem: async (item) => {
    const client = await _client;
    const db = client.db('triplog').collection('checklist');
    const result = await db.updateOne(
      { userId: 'test', 'items.title': item.title },
      {
        $addToSet: {
          'items.$.content': item.item,
        },
      }
      // { upsert: true }
    );
    if (result.acknowledged) {
      return item;
    } else {
      throw new Error('통신 이상');
    }
  },
  // checked 변경
  checkedItem: async (el) => {
    const client = await _client;
    const db = client.db('triplog').collection('checklist');
    const result = await db.updateOne(
      { userId: el.userId },
      { $set: { checked: el.checked } }
    );
    if (result.acknowledged) {
      return '업데이트 성공';
    } else {
      throw new Error('통신 이상');
    }
  },
  deleteItem: async (el) => {
    const client = await _client;
    const db = client.db('triplog').collection('checklist');
    const result = await db.updateOne(
      { userId: el.userId, 'items.title': el.title },
      // {
      //   items: { $elemMatch: { item: 'el.item' } },
      // },
      // { $unset: { item: 'el.item', checked: el.checked } }
      { $pull: { 'items.$.content': el.item } }
    );
    if (result.acknowledged) {
      return '삭제 되었습니다.';
    } else {
      throw new Error('통신 이상');
    }
  },
};

module.exports = checkDB;
