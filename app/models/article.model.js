const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    id: Number,
    article: String,
    // Idx: Number
});

module.exports = mongoose.model('Articles1', ArticleSchema);