const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports.User = require('./User');