/**
 * Created by aliez on 2017/10/19.
 */

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema =new mongoose.Schema({
    id:String,
    comment:String,
    commenter:String,
    date: { type: Date, default: Date.now },
});

schema.plugin(mongoosePaginate);
var Comments = mongoose.model('Comments',schema,'comments');
module.exports = Comments;