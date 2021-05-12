const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transaction = new Schema({
    amount: Number,
    message: String,
    person_to_id: Number,
    person_from_id: Number,
    reason: String
});

module.exports = mongoose.model('Transaction', Transaction);