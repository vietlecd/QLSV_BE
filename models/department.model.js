const mongoose = require('mongoose');

// Schema for KHOA
const khoaSchema = new mongoose.Schema({
  maKhoa: { type: String, required: true, unique: true },
  tenKhoa: String
});

const Khoa = mongoose.model('Khoa', khoaSchema, 'departments');

module.exports = Khoa;