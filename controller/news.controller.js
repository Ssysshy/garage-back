/**
 * Created by aliez on 2017/10/17.
 */



var mongoose = require('mongoose');
const DataModel = require('../models/news.model');
const DataModelComment = require('../models/comment.model');
var async = require('async');

exports.create = function (req,res,next) {
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
    if (req.body.path && req.body.path.trim().length>0) {
        var path = req.body.path;
        queryCondition = {
            'path':new RegExp(path,'i')
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
    if (req.body.title && req.body.title.trim().length>0) {
        var title = req.body.title;
        queryCondition = {
            'title':new RegExp(title,'i')
        }
    };

    if (req.body.typeValue && req.body.typeValue.toString().trim().length>0) {
        var typeValue = req.body.typeValue;

        queryCondition = Object.assign(queryCondition,{
            'typeValue':req.body.typeValue
        })
    };

    DataModel.paginate(queryCondition, {sort: { date: -1 }, page: parseInt(page), limit: parseInt(rows) }, function(err, result) {
        var arr = result.docs;
        var leng = result.docs.length;

        async.map(result.docs,function (news,callback) {

            DataModelComment.count({id:news._id},function (err,count) {
                if (err) {
                    return;
                }else{
                    news.CommentNum = count;
                    callback();
                };
            })
        },function (err) {
            result.rows = result.docs;
            delete result.docs;
            res.json(result);
            // console.log(result);
        })
    });
}


//对于没有转字符串类型的对象
// exports.deletes = function (req, res, next) {
//     var ids = req.body['ids[]'];
//     if (ids.length>0) {
//         DataModel.remove({_id:{$in:ids}}).then(data=>{
//             res.json({"msg":"delete success","status":200});
//         })
//     }else{
//         res.json({"msg":"delete fail","status":404});
//     };
// }

exports.deletes = function (req, res, next) {
    var ids = req.body.ids;
    if (ids.length>0) {
        DataModel.remove({_id:{$in:ids.split(',')}}).then(data=>{
            res.json({"msg":"delete success","status":200});
        })
    }else{
        res.json({"msg":"delete fail","status":404});
    };
}
