const express = require('express');

const router = express.Router();

const multer = require('multer');
const path = require('path'); //Upload image
// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'lesson_uploads/') // Store lesson files in 'lesson_uploads' folder
  },
  filename: function(req, file, cb) {
    // Append the upload date and the original file extension to the original name
    cb(null, file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname))
  }
});

// Create the upload middleware
const upload = multer({ storage: storage });

const bangdieukhienController = require('../../controllers/users/teacher/bangdieukhien.controller');

router.get('/', bangdieukhienController.dashboard);
router.get('/:courseCode', bangdieukhienController.viewStudentEnrollCourse);

router.get('/:courseCode/khoahoc', bangdieukhienController.viewCourse);
router.post('/:courseCode/khoahoc/uploadLesson', upload.single('lessonFile'), bangdieukhienController.updateLesson);
router.get('/:courseCode/sinhvien', bangdieukhienController.viewStudentEnrollCourse);
router.put('/:courseCode/sinhvien/updateGrade', bangdieukhienController.updateGradeforStudent);

module.exports = router;