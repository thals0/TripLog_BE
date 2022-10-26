const mongoClient = require('../mongo');

// _여러번 실행되는 걸 막음
const _client = mongoClient.connect();

const chargeDB = {
  // 금액 요청(GET)
  getCharge: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('charge');
    const charge = await db.find({}).toArray();
    return charge;
  },

  // 금액 만들기(POST)
  postCharge: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('charge');
    const charge = await db.insertOne();
    if(charge.acknowledged) {
      return true;
    } else {
      throw new Error ('통신이상');
    };
  },

  // 금액 업데이트(POST)
  saveCharge: async (chargeList) => {
    const client = await _client;
    const db = client.db('triplog').collection('charge');
    const charge = await db.updateOne(
      { user: 'test' },
      {
        $set: {
          chargeList
        },
      }
    );

    if(charge.acknowledged) {
      return true;
    } else {
      throw new Error ('통신이상');
    };
  },
};

module.exports = chargeDB;