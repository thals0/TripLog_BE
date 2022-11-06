const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://triplog:qwe123@cluster0.qzlzzhu.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
