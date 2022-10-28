const mongoClient = require('../mongo');

// _여러번 실행되는 걸 막음
const _client = mongoClient.connect();

// const itemDB = {
//   getItem: async () => {
//     const client = await _client;
//     const db = client.db('triplog').collection('item');

//     const saveItem = {
//       contentId : '127635',
//       view: 0,
//       like: 0,
//     }
    
//     if (db.findOne({ contentId: '127635' })) {
//       const dd = await db.updateOne(
//         { contentId: '127635' },
//         {
//           $set: {
//             user: 'test',
//           },
//         }
//       );
//     } else {
//       const item = await db.insertOne(saveItem);
//     }
    
//     return item
//   },
// };
const itemDB = {
  getItem: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('item');

    const saveItem = {
      contentId : '127635',
      view: 0,
      like: 0,
    }

    if(db.findOne({contentId : '127635'}) !== undefined){
      await db.insertOne(saveItem)
    }
    
    const item = await db.updateOne(
      { contentId: '127635' },
      {
        $inc: { view : 1 },
      }
    );
    
    return item
  },
};

module.exports = itemDB;