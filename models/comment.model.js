/**
 * Created by aliez on 2017/10/19.
 */

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var moment = require('moment');

var schema = new mongoose.Schema({
    id: String,
    comment: String,
    commenter: String,
    date: { type: String, default: moment().format("YYYY-MM-DD HH:MM:SS") },
});

schema.plugin(mongoosePaginate);
var Comments = mongoose.model('Comments', schema, 'comments');
module.exports = Comments;