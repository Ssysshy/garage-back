/**
 * Created by aliez on 2017/10/17.
 */

/**
 * Created by aliez on 2017/10/17.
 */

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = mongoose.Schema;


var NewsSchema = new schema({
    name:String,
    password:String,
    date: { type: Date, default: Date.now },
});


NewsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('News',NewsSchema,'news');