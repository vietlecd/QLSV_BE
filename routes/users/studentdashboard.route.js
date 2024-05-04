const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const multer = require('multer');
const path = require('path'); //Upload image
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')  // Store files in the 'uploads' folder
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-sv-' + Date.now() + path.extname(file.originalname))  // Create a unique file name
    }
});

// Create the upload middleware
const upload = multer({ storage: storage });


//router
const dangkimonRoute = require('./dangkimon.route')
//*************************//

//controller
const thongtinSinhVien = require('../../controllers/users/student/thongtinsv.controller');
const thongtinDaoTao = require('../../controllers/users/student/thongtindt.controller');
const tkb = require('../../controllers/users/student/tkb.controller');
const bangdiem = require('../../controllers/users/student/bangdiem.controller');
const lichthi = require('../../controllers/users/student/lichthi.controller');
const khoahoc = require('../../controllers/users/student/khoahoc.controller');
//*************************//

//get all route
router.get('/thongtinsinhvien', thongtinSinhVien.dashboard);
router.put('/thongtinsinhvien', thongtinSinhVien.updateStudent);
router.post('/thongtinsinhvien/updatePicture', upload.single('image'), thongtinSinhVien.updatePicture);
router.get('/thongtindaotao', thongtinDaoTao.getAllDaoTao);
router.get('/tkb', tkb.getTKB);
router.get('/lichthi', lichthi.getAllLichThi);
router.get('/lichthi/:semester', lichthi.getLichThi);
router.get('/bangdiem', bangdiem.getbangdiem);
router.get('/bangdiem/:semester', bangdiem.getbangdiemBySem);
router.get('/khoahoc',khoahoc.dashboard);
router.get('/khoahoc/:courseCode',khoahoc.viewCourseDescription);
//*************************//

//use route
router.use('/dangkimon', dangkimonRoute);

module.exports = router;