/**
 * Created by c5sshy on 2017/10/17.
 */

const DataModel = require('../models/disk.model');

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

