const mongoClient = require('../mongo');

// _여러번 실행되는 걸 막음
const _client = mongoClient.connect();

const usersDB = {
  getUser: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('users');
    const data = await db.find({}).toArray();
    return data;
  },
};

module.exports = usersDB;
