const express = require('express');

const router = express.Router();

const teacherController = require('../../controllers/admin/teacher.controller');

router.get('/', teacherController.getAllTeachers);
router.post('/add', teacherController.addTeacher);
router.put('/:msgv', teacherController.updateTeacher);
router.delete('/:msgv', teacherController.deleteTeacher);

const multer = require('multer');
const path = require('path'); //Upload image
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')  // Store files in the 'uploads' folder
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-gv_admin-' + Date.now() + path.extname(file.originalname))  // Create a unique file name
    }
});

const upload = multer({ storage: storage });

// Route to update a student's information and handle image upload
router.post('/upload/:msgv', upload.single('image'), teacherController.updateTeacher);

module.exports = router;