/**
 * Created by aliez on 2017/10/17.
 */


var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var moment = require('moment');

var schema =new mongoose.Schema({
    name: String,
    pwd: String,
    date: { type: String, default: moment().format("YYYY-MM-DD HH:MM:SS") }
});

schema.plugin(mongoosePaginate);
var User = mongoose.model('User',schema,'user');
module.exports = User;
