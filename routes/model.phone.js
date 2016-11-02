

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PhoneSchema   = new Schema({
    pname: String,
    pphone: String
});

module.exports = mongoose.model('Phone', PhoneSchema);
