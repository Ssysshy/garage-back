/**
 * Created by aliez on 2017/10/18.
 */


/**
 * Created by aliez on 2017/10/17.
 */


var mongoose = require('mongoose');
const DataModel = require('../models/cate.model');

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

exports.finds = function (req, res, next) {
    var data = req.body;
    DataModel.find(data,function(err,doc){
        res.json(doc);
    });
}

exports.findIds = function (req, res, next) {
	var id = req.body.id;
	var ids=[];
	DataModel.findOne({_id: id}, function(err, doc) {
		if(doc){
			doc.getChildren().then(function(docs){
				docs.push(doc);
				for (var i in docs) {
					ids.push(docs[i]._id);
				}
        res.json(ids);
			});
		}
	})
}


exports.update = function (req, res, next) {
    //req.body是一个{}
    const id = req.params.id;

    DataModel.findByIdAndUpdate(id, {$set:req.body}, {new:false}).then(user=>{
        //user是修改前的数据
        res.json({'status':200});
    })
}

exports.remove = function (req, res, next) {
    //req.body是一个{}
    const id = req.params.id;
    var ids = [];
    DataModel.findOne({_id:id},function (err, doc) {
        if (doc) {
            ids.push(id);
            doc.getChildren().then(function(docs){
                for (var i = 0; i < docs.length; i++) {
                    ids.push(docs[i]._id);
                }
                DataModel.remove({_id:{$in : ids}}).then(data=>{
                    res.json({'msg':'delete node success','status':200});
                })
            });
        }else{
            res.json({'msg':'delete node failed','status':404});
        };
    })
}

function reverseTree(data, pid) {
    var result = [],
        temp;

    var data = JSON.parse(JSON.stringify(data));

    for(var i in data){
        if (data[i].parentId == pid) {
            result.push(data[i])

            temp = reverseTree(data,data[i]._id);

            if (temp.length>0) {
                data[i].children = temp;
            };
        };
    }
    return result;
}

exports.list = function (req, res, next) {
    DataModel.find({},function (err,data) {
        if (err) {
            console.log(err);
            return
        }else{
            var reTree = reverseTree(data,null);
            res.json(reTree);
        };
    })
}

exports.device = function (req, res, next) {
    DataModel.find({typeValue:req.body.typeValue},function (err,data) {
        if (err) {
            console.log(err);
            return
        }else{
            var reTree = reverseTree(data,null);
            res.json(reTree);
        };
    })
}
