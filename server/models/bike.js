const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bikeSchema = new Schema({
    title: String,
    type: String,
    creatorId: String
});

module.exports = mongoose.model('Bike', bikeSchema);
