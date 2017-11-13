/**
 * Created by aliez on 2017/10/31.
 */


var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema =new mongoose.Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    cateId:String,
    filename: String,
    path: String,
    size: Number,
    date: { type: Date, default: Date.now },
    typeValue:Number
});

schema.plugin(mongoosePaginate);
var Upload = mongoose.model('Upload',schema,'upload');
module.exports = Upload;