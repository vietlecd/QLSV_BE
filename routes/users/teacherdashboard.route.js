const express = require('express');
const router = express.Router();
const thongtinGiangVien = require('../../controllers/users/teacher/thongtingv.controller');
const SinhVien = require('../../controllers/users/teacher/SinhVien.controller');

const multer = require('multer');
const path = require('path'); //Upload image
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')  // Store files in the 'uploads' folder
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-gv-' + Date.now() + path.extname(file.originalname))  // Create a unique file name
    }
});

// Create the upload middleware
const upload = multer({ storage: storage });

const bangdieukhienRoute = require('./bangdieukhien.route')

router.get('/thongtingiangvien',thongtinGiangVien.dashboard);
router.put('/thongtingiangvien',thongtinGiangVien.updateTeacher);
router.use('/SinhVien',SinhVien.dashboard);
router.post('/thongtingiangvien/updatePicture', upload.single('image'), thongtinGiangVien.updatePicture);


//use route
router.use('/bangdieukhien', bangdieukhienRoute)




module.exports = router;