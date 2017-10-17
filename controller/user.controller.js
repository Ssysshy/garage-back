/**
 * Created by aliez on 2017/10/17.
 */


var mongoose = require('mongoose');
const User = require('../models/user.model');

exports.create = function (req,res,next) {
    const user = new User(req.body);

    user.save().then(data=>{
        res.json(data)
    })
}

exports.get = function (req, res, next) {
    var id  = req.params.id;
    User.findById(id, function (err, data) {
        res.json(data);
    })
}

exports.update = function (req, res, next) {
    //req.body是一个{}
    const id = req.params.id;

    User.findByIdAndUpdate(id, {$set:req.body}, {new:false}).then(user=>{
        //user是修改前的数据
        res.json(user);
    })
}

exports.remove = function (req, res, next) {
    //req.body是一个{}
    const id = req.params.id;

    User.findByIdAndRemove(id, function (err, data) {
        if (err) {
            console.log(err);
            return
        }else{
            res.json(data);
        };
    })
}

exports.list = function (req, res, next) {
    var page = (req.body.page)?req.body.page : 1;
    var limit = (req.body.limit)?req.body.limit : 10;

    var queryCondition = {};
    if (req.body.name && req.body.name.trim().length>0) {
        var name = req.body.name;

        queryCondition = {
            'name':new RegExp(name,'i')
        }
    };


    User.paginate(queryCondition, { page: parseInt(page), limit: parseInt(limit) }, function(err, result) {
        result.rows = result.docs;
        delete result.docs;
        res.json(result);
    });


}