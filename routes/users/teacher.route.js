const express = require('express');
const router = express.Router();
const teacherController = require('../../controllers/users/teacher/teacher.controller');
const teacherDashboard = require('./teacherdashboard.route');
const { body } = require('express-validator');
const authenticate = require('../../middlewares/authenticate');


// login route
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
], teacherController.login);

// change password route
router.post('/changepassword', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], teacherController.changePassword);

router.use('/dashboard', authenticate, teacherDashboard);


module.exports = router;