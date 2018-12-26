const mongoose = require('mongoose');
let mongodbConfig = null;
mongoose.Promise = global.Promise;

/**
 * 根据开发环境调取不同的数据库配置
 */
if (process.env.NODE_ENV === 'development') {
  mongodbConfig = require('config').get('mongodbLocal');
} else {
  mongodbConfig = require('config').get('mongodb');
}

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
  if (process.env.NODE_ENV !== 'development') {
    options.user = mongodbConfig.get('user');
    options.pass = mongodbConfig.get('pwd');
  }
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

/**
 * 创建 Mongo 连接，内部维护了一个连接池，全局共享
 */
let mongoClient = mongoose.connect(getMongoUri(), getMongoOptions());


/**
 * 关闭 Mongo 连接
 */
function close() {
  mongoClient.close();
}

/**
 * Mongo 连接成功回调
 */
mongoClient.on('connected', function () {
  console.log('Mongoose connected to ' + getMongoUri());
});
/**
 * Mongo 连接失败回调
 */
mongoClient.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});
/**
 * Mongo 关闭连接回调
 */
mongoClient.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

module.exports = {
  mongoClient: mongoClient,
  close: close,
};
