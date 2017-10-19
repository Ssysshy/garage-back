/**
 * Created by aliez on 2017/10/19.
 */

var mongoose = require('mongoose');
const DataModel = require('../models/comment.model');

exports.create = function (req,res,next) {
    console.log(req.body);
    const dataModel = new DataModel(req.body);

    dataModel.save().then(data=>{
        res.json(data);
    })
}

exports.get = function (req, res, next) {
    var id  = req.params.id;
    DataModel.findById(id, function (err, data) {
        res.json(data);
    })
}

exports.finds = function (req, res, next) {
    var page = (req.body.page)?req.body.page : 1;
    var rows = (req.body.rows)?req.body.rows : 10;
    var queryCondition = {};
    if (req.body.id && req.body.id.trim().length>0) {
        var id = req.body.id;
        queryCondition = {
            'id':new RegExp(id,'i')
        }
    };
    DataModel.paginate(queryCondition, {sort: { date: -1 }, page: parseInt(page), limit: parseInt(rows) }, function(err, result) {
        result.rows = result.docs;
        delete result.docs;
        res.json(result);
    });
}

exports.update = function (req, res, next) {
    //req.body是一个{}
    const id = req.params.id;

    DataModel.findByIdAndUpdate(id, {$set:req.body}, {new:false}).then(user=>{
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
        }else{
            res.json({"msg":"delete success","status":200});
        };
    })
}

exports.list = function (req, res, next) {
    var page = (req.body.page)?req.body.page : 1;
    var rows = (req.body.rows)?req.body.rows : 10;
    var queryCondition = {};
    if (req.body.comment && req.body.comment.trim().length>0) {
        var comment = req.body.comment;
        queryCondition = {
            'comment':new RegExp(comment,'i')
        }
    };

    DataModel.paginate(queryCondition, {sort: { date: -1 }, page: parseInt(page), limit: parseInt(rows) }, function(err, result) {
        result.rows = result.docs;
        delete result.docs;
        res.json(result);
    });
}

exports.deletes = function (req, res, next) {
    var ids = req.body['ids[]'];
    if (ids.length>0) {
        DataModel.remove({_id:{$in:ids}}).then(data=>{
            res.json({"msg":"delete success","status":200});
        })
    }else{
        res.json({"msg":"delete fail","status":404});
    };
}