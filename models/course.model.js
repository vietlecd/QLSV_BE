const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    semester: { type: String, required: false },
    courseCode: { type: String, required: false, unique: true},
    courseName: {type: String, required: false },
    msgv: {type: String, required: false },
    instructorName: { type: String, required: false },
    credit: {type: String, required: false },
    scheduleDay: { type: String, required: false },
    scheduleTime: { type: String, required: false },
    scheduleWeek: {type: [Number],required: false },
    tinhchihocphi:{type: Number, required: false },
    STT:{type: Number, required: false },
    classroom: {
        room: {type: String, required: false },
        building: {type: String, required: false },
    },
    midterm:{
        examDay: {type: String,required: false },
        examTime: {type: String,required: false },
        room: {type: String,required: false },
    },
    final:{
        examDay: {type: String, required: false },
        examTime: {type: String, required: false },
        room: {type: String, required: false },
    },
});

const courseModel = mongoose.model('course', courseSchema);
module.exports = courseModel;