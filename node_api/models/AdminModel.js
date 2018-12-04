var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var AdminSchema = new Schema({
    id: ObjectId,
    username: String,
    password: String,
    email: String
});

var AdminModel = mongoose.model('admin', AdminSchema);

module.exports = AdminModel;
