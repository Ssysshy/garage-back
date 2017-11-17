/**
 * Created by aliez on 2017/10/17.
 */

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var moment = require('moment');

var schema =new mongoose.Schema({
    title:String,
    path:String,
    CommentNum:Number,
    content:String,
    cateId:String,
    typeValue:Number,
    date: { type: Date, default: moment().format("YYYY-MM-DD HH:MM:SS") },
    thumb:Object
});

schema.plugin(mongoosePaginate);
var News = mongoose.model('News',schema,'news');
module.exports = News;