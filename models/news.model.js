/**
 * Created by aliez on 2017/10/17.
 */

/**
 * Created by aliez on 2017/10/17.
 */

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema =new mongoose.Schema({
    name:String,
    password:String,
    date: { type: Date, default: Date.now },
});

schema.plugin(mongoosePaginate);
var News = mongoose.model('News',schema,'news');

module.exports = News;