const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Name: String,
    Reg_No: String,
    Idx: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);