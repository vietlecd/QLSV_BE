const mongoose = require('mongoose');
const couSem = require('./courseInSemester.model.js').Schema

const studentSchema = new mongoose.Schema(
{
    name: String,
    email: String,
    password: {
        type: String, 
        default: '123456',
    },
    mssv: { 
        type: String, 
        require: true, 
        unique: true
    },
    role: {
        type: String,
        default: 'student'
    },
    image: { type: String, required: false },
    passwordChanged: {
        type: Boolean,
        default: false,
    },
    private_info:{
        ngaySinh: Date,
        gioiTinh: { type: String, enum: ['Nam', 'Nu'] },
        soCCCD: String,
        ngayCapCCCD: Date,
        noiCapCCCD: String,
        khoa: String,
        maLop: { type: String, ref: 'Lop' },
        diaChi: String,
        soDienThoai: String,
        emailTruongCap: String,
        emailLienLac: String,
    },
      // Training information
    training_info:{
        namNhapHoc: String,
        giaHanHocKy: String,
        soHocKyDaoTao: Number,
        soHocKyDaoTaoToiDa: Number,
        thoiGianDaoTao: String,
        thoiGianDaoTaoToiDa: String,
        namHoc: String,
        capHoc: String,
        heDaoTao: String,
        nganhDaoTao: String,
        trangThaiSinhVien: String,
        
    },
    courseEnroll: {
        type: [couSem],
    },
    courseReg: {
        type: [couSem]
    }
}, 
    { 
        timestamps: true // Enable createdAt and updatedAt fields
    }
);

const studentModel = mongoose.model('student', studentSchema);
module.exports = studentModel;
