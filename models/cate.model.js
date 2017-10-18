/**
 * Created by aliez on 2017/10/18.
 */


var mongoose = require('mongoose');
var materializedPlugin = require('mongoose-materialized');

var schema =new mongoose.Schema({
    text:String
});

schema.plugin(materializedPlugin);
var Cate = mongoose.model('Cate',schema,'cate');
module.exports = Cate;