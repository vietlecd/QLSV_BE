const express = require('express');

const router = express.Router();
const studentRoute = require('./student.route');
const teacherRoute = require('./teacher.route');
const control_panelRoute = require('./control_panel.route');
// Import routes

// Dashboard route
router.get('/', (req, res) => {
    res.send('Welcome to the dashboard!');
});
router.use('/student', studentRoute); 
router.use('/teacher', teacherRoute);
router.use('/controlpanel', control_panelRoute); 

module.exports = router;