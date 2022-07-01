require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
let dbInstance = null;

module.exports.getDBInstance = async function () {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }
  const db = await MongoClient.connect(process.env.MONGO_CONNECTION_STR);
  dbInstance = db.db("equipments");
  return dbInstance;
};
