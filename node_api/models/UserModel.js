var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    id: ObjectId,
    first_name: String,
    last_name: String,
    email_address: String,
    career: String,
    status: Boolean
});

var UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
