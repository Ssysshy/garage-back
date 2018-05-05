/**
 * Created by aliez on 2018/3/12.
 */

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var moment = require('moment');

var schema = new mongoose.Schema({
  number: Number,
  occupy: String,
  deadtime: String,
  date: {type: String, default: moment().format("YYYY-MM-DD HH:MM:SS")},
});

schema.plugin(mongoosePaginate);
var Occupy = mongoose.model('Occupy', schema, 'occupy');
module.exports = Occupy;
