const express = require('express');
const controlPanelController = require('../../controllers/admin/control_panel.controller');

const router = express.Router();

// Get all courses
router.get('/courses', controlPanelController.getCourses);

// Add a new course
router.post('/courses', controlPanelController.addCourse);

// Update an existing course
router.put('/courses/:courseCode', controlPanelController.updateCourse);

// Delete a course
router.delete('/courses/:courseCode', controlPanelController.deleteCourse);

module.exports = router;
