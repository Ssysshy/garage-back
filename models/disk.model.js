/**
 * Created by c5sshy on 2018/12/05.
 */


const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const schema = new mongoose.Schema({
  resourceName: String,
  resourceUrl: String
});

schema.plugin(mongoosePaginate);

const Disk = mongoose.model('Disk', schema, 'disk');
module.exports = Disk;
