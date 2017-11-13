/**
 * Created by aliez on 2017/10/31.
 */

var mongoose = require('mongoose');
const DataModel = require('../models/upload.model');
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        //返回上一个文件名，该文件是通过表单文件上传的名称（前台设置avatar）+时间戳+原始文件扩展名
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
})

exports.upload = function (req,res,next) {
    //实例化multer
    var upload = multer({
        storage:storage
    }).single('avatar');
    upload(req,res,function (err) {
        if (err) {
            console.log(err);
        }else{
            req.file.cateId = req.params.cateId;
            console.log(req.file)
            const dataModel = new DataModel(req.file);
            res.json(req.file);
            dataModel.save().then(data=>{
                res.json(data);
            })
        };
    })
}

exports.list = function (req, res, next) {
    var page = (req.body.page)?req.body.page : 1;
    var rows = (req.body.rows)?req.body.rows : 10;

    var queryCondition = {};
    if (req.body.originalname && req.body.originalname.trim().length>0) {
        var originalname = req.body.originalname;

        queryCondition = {
            'originalname':new RegExp(originalname,'i')
        }
    };

    if (req.body.typeValue && req.body.typeValue.toString().trim().length>0) {
        var typeValue = req.body.typeValue;

        queryCondition = Object.assign(queryCondition,{
            'typeValue':req.body.typeValue
        })
    };

    if (req.body.ids && req.body.ids.length>0) {
        
        queryCondition = Object.assign(queryCondition,{
            cateId:{$in:req.body.ids}
        })
    };

    console.log(queryCondition);
    DataModel.paginate(queryCondition, {sort: { date: -1 }, page: parseInt(page), limit: parseInt(rows) }, function(err, result) {
        result.rows = result.docs;
        delete result.docs;
        res.json(result);
    });
}

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