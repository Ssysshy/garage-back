const mongoose = require('mongoose');
const mongodbConfig = require('config').get('mongodb');

mongoose.Promise = global.Promise;


/**
 * 配置 MongoDb options
 */
function getMongoOptions() {
  const options = {
    useMongoClient: true,
    poolSize: 5, // 连接池中维护的连接数
    reconnectTries: Number.MAX_VALUE,
    keepAlive: 120,
    authSource: 'admin'
  };
  options.user = mongodbConfig.get('user');
  options.pass = mongodbConfig.get('pwd');
  if (mongodbConfig.get('replicaSet').get('name')) options.replicaSet = mongodbConfig.get('replicaSet').get('name');
  return options;
}

/**
 * 拼接 MongoDb Uri
 *
 * @returns {string}
 */
function getMongoUri() {
  let mongoUri = 'mongodb://';
  let dbName = mongodbConfig.get('db');
  let replicaSet = mongodbConfig.get('replicaSet');
  if (replicaSet.get('name')) { // 如果配置了 replicaSet 的名字 则使用 replicaSet
    let members = replicaSet.get('members');
    for (let member of members) {
      mongoUri += `${member.host}:${member.port},`;
    }
    mongoUri = mongoUri.slice(0, -1); // 去掉末尾逗号
  } else {
    mongoUri += `${mongodbConfig.get('host')}:${mongodbConfig.get('port')}`;
  }
  mongoUri += `/${dbName}`;

  return mongoUri;
}
