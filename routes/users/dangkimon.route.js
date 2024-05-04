const express = require('express');

const router = express.Router();

const dangkimonController = require('../../controllers/users/student/dangkimon.controller');


router.get('/', dangkimonController.viewAvailableCourse);
router.get('/viewReg', dangkimonController.viewCourseReg);
router.put('/reg/:courseCode', dangkimonController.addCourseReg)
router.put('/confirmReg', dangkimonController.confirmReg)
router.delete('/delOne/:courseCode', dangkimonController.deleteCourseReg)
router.delete('/delAll', dangkimonController.deleteAllCourseReg)


module.exports = router;