/**
 * Created by aliez on 2018/3/12.
 */


var mongoose = require('mongoose');
const DataModel = require('../models/occupy.model');
var moment = require('moment');

exports.create = function (req,res,next) {
  const dataModel = new DataModel(req.body);
  dataModel.save().then(data=>{
    res.json(data)
  })
}

exports.get = function (req, res, next) {
  var id  = req.params.id;
  DataModel.findById(id, function (err, data) {
    res.json(data);
  })
}

exports.update = function (req, res, next) {
  //req.body是一个{}
  const id = req.params.id;

  DataModel.findByIdAndUpdate(id, {$set:req.body}, {new:false}).then(user=>{
    //user是修改前的数据
    res.json(user);
  })
}

exports.list = function (req, res, next) {
  var page = (req.body.page)?req.body.page : 1;
  var rows = (req.body.rows)?req.body.rows : 10;

  var queryCondition = {};
  if (req.body.name && req.body.name.trim().length>0) {
    var name = req.body.name;

    queryCondition = {
      'name':new RegExp(name,'i')
    }
  };
  var date = new Date().getTime();
  DataModel.paginate(queryCondition, {sort: { date: -1 }, page: parseInt(page), limit: parseInt(rows) }, function(err, result) {
    result.rows = result.docs;
    var arr = result.rows;
    delete result.docs;
    for (var i = 0; i < arr.length; i += 1) {
      var timel = Number(arr[i].date);
      var cha = arr[i].lasttime * 60 * 60 * 1000;
      if (cha === 0) {
        arr[i].occupy = '空置'
      }
      if (timel + cha - date > 0) {
        arr[i]['occupy'] = '已占用';
        arr[i]['deadtime'] = timestampToTime(timel + cha - date);
      } else {
        arr[i]['occupy'] = '空置';
        arr[i]['deadtime'] = '00:00:00';
      }
    }
    res.json(result);
  });
}

function timestampToTime(timestamp) {
  var date = parseInt(timestamp/1000)
  var H = Math.floor(date / 3600);
  var M = Math.floor((date - H * 3600) / 60);
  var S = date - H * 3600 - M * 60;
  return H + ':' + M + ':' + S;
}
