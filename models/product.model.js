/**
 * Created by aliez on 2017/11/13.
 */

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var moment = require('moment');

var schema =new mongoose.Schema({
    title:String,
    price:String,
    description:String,
    typeValue:Number,
    cateId:String,
    date: { type: String, default: moment().format("YYYY-MM-DD HH:MM:SS") },
    thumb:Object
});

schema.plugin(mongoosePaginate);
var Product = mongoose.model('Product',schema,'product');
module.exports = Product;