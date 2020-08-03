const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const creatorSchema = new Schema({
    name: String,
    age: String
});

module.exports = mongoose.model('Creator', creatorSchema);
