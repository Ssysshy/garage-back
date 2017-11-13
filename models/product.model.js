/**
 * Created by aliez on 2017/11/13.
 */

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema =new mongoose.Schema({
    title:String,
    price:String,
    description:String,
    typeValue:Number,
    cateId:String,
    date: { type: Date, default: Date.now },
    thumb:Object
});

schema.plugin(mongoosePaginate);
var Product = mongoose.model('Product',schema,'product');
module.exports = Product;