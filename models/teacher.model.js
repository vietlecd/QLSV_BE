const mongoose = require('mongoose');
const couSem = require('./courseInSemester.model.js').Schema

const teacherSchema = new mongoose.Schema({
    name: String, 
    email: String,
    password: {
        type: String,
        default: '123456'
    },
    msgv: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: String,
        default: 'teacher'
    },
    image: { type: String, required: false },
    private_info: {
        ngaySinh: Date, 
        gioiTinh: String,
        soCCCD: Number,
        ngaycapCCCD: Date,
        noicapCCCD: String,
        bangcap: String,
    },
    contact_info: {
        diachi: String, 
        sodienthoai: Number,
        emailtruongcap: String,
        emaillienlac: String 
    },
});

const teacherModel = mongoose.model('teacher', teacherSchema);
module.exports = teacherModel;