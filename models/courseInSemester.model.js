const mongoose = require('mongoose');

const courseSemesterSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'course',
        required: true,
        unique: true
    },
    semester: {type: String, ref: 'course'},
    courseCode: {type: String, ref: 'course'},
    credit: {type: Number, ref: 'course'},
    instructorName: {type: String, ref: 'course'},
    msgv: {type: String, ref: 'course'},
    grade: {
        lab: {type: Number, default: null},
        midterm: {type: Number, default: null},
        final: {type: Number, default: null}
    }
});

const courseSemesterModel = mongoose.model('courseSemester', courseSemesterSchema);
module.exports = courseSemesterModel;