const mongoose = require('mongoose');
const passLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    username: String,
    hash: String,
    buyer: {type: Boolean, default: true}
});

userSchema.plugin(passLocalMongoose);

module.exports = new mongoose.model('user', userSchema);    