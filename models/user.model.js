/**
 * Created by aliez on 2017/10/17.
 */

// var mongoose = require('mongoose');
// var mongoosePaginate = require('mongoose-paginate');
//
// var schema = mongoose.Schema;
//
//
// var UserSchema = new schema({
//     name:String,
//     password:String,
//     date: { type: Date, default: Date.now },
// });
//
//
// UserSchema.plugin(mongoosePaginate);
//
// module.exports = mongoose.model('User',UserSchema,'user');




var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var moment = require('moment');

var schema =new mongoose.Schema({
    name:String,
    password:String,
    carInfo:String,
    gender:String,
    date: { type: String, default: moment().format("YYYY-MM-DD HH:MM:SS") },
});

schema.plugin(mongoosePaginate);
var User = mongoose.model('User',schema,'user');
module.exports = User;