/**
 * Created by aliez on 2018/3/12.
 */


var mongoose = require('mongoose');
const DataModel = require('../models/occupy.model');

exports.create = function (req,res,next) {
  const dataModel = new DataModel(req.body);
  dataModel.save().then(data=>{
    res.json(data)
  })
}


