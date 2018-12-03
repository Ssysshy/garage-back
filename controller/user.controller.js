/**
 * Created by aliez on 2017/10/17.
 */

const DataModel = require('../models/user.model');

exports.create = function (req, res, next) {
  const dataModel = new DataModel(req.body);
  dataModel.save().then(function (err, data) {
    res.json(data)
  })
}

exports.get = function (req, res, next) {
  var id = req.params.id;
  DataModel.findById(id, function (err, data) {
    res.json(data);
  })
}

exports.checklogin = function (req, res, next) {
  var name = req.body.name;
  var password = req.body.password;
  var data = {name: name, password: password};
  DataModel.find(data, function (err, data) {
    if (data.length > 0) {
      res.json(data);
    } else {
      res.json([{'msg': '用户名或密码错误', 'status': 404, name: ''}]);
    }
    ;
  })
}

exports.update = function (req, res, next) {
  //req.body是一个{}
  const id = req.params.id;
  DataModel.findByIdAndUpdate(id, {$set: req.body}, {new: false}).then(function (user) {
    //user是修改前的数据
    res.json(user);
  })
}

exports.remove = function (req, res, next) {
  //req.body是一个{}
  const id = req.params.id;
  DataModel.findByIdAndRemove(id, function (err, data) {
    if (err) {
      console.log(err);
      return
    } else {
      res.json({"msg": "delete success", "status": 200});
    }
  })
};

exports.list = function (req, res, next) {
  console.log(req.body);
  var page = (req.body.page) ? req.body.page : 1;
  var rows = (req.body.rows) ? req.body.rows : 10;

  var queryCondition = {};
  if (req.body.name && req.body.name.trim().length > 0) {
    var name = req.body.name;

    queryCondition = {
      'name': new RegExp(name, 'i')
    }
  }
  DataModel.paginate(queryCondition, {
    sort: {date: -1},
    page: parseInt(page),
    limit: parseInt(rows)
  }, function (err, result) {
    result.rows = result.docs;
    delete result.docs;
    res.json(result);
  });
};

exports.deletes = function (req, res, next) {
  var ids = req.body.ids;
  if (ids.length > 0) {
    DataModel.remove({_id: {$in: ids.split(',')}}).then(function (data) {
      res.json({"msg": "delete success", "status": 200});
    })
  } else {
    res.json({"msg": "delete fail", "status": 404});
  };
};

