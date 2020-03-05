const mongoose = require('mongoose');

const SummarySchema = mongoose.Schema({
    std_id: Number,
    art_id : Number,
    summary : String,
    // Idx: Number
});

module.exports = mongoose.model('summary1', SummarySchema);