
//Note: this model is for testing only

const mongoose = require('mongoose');
const couSem = require('./courseInSemester.model').Schema

const studentLiteSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String, 
        default: '123456'
    },
    mssv: { 
        type: String, 
        require: true, 
        unique: true
    },
    private_info:{
        gioiTinh: { type: String, enum: ['Nam', 'Nu'] },
    },
      // Training information
    training_info:{
        namNhapHoc: String,       
    },
    courseEnroll: {
        type: [couSem],
    }
}, 
    { 
        timestamps: true // Enable createdAt and updatedAt fields
    }
);

const studentLiteModel = mongoose.model('studentLite', studentLiteSchema);
module.exports = studentLiteModel;
