const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: String, 
    email: String,
    password: String,
    role: {
        type: String,
        default: 'admin'
    }
});

const adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel;