const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transaction = new Schema({
    amount: Number,
    message: String,
    person_to_id: Schema.Types.ObjectId,
    person_from_id: Schema.Types.ObjectId,
    reason: String
});

module.exports = mongoose.model('Transaction', Transaction);