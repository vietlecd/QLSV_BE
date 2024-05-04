// Import necessary modules and models
const Course = require('../../models/course.model');

// Get all courses
const getCourses = async (req, res) => {
  // Logic to retrieve courses from the database
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Add a new course
const addCourse = async (req, res) => {
  // Logic to add a new course to the database
  try {
    const newCourse = new Course({
        semester: req.body.semester,
        courseCode: req.body.courseCode,
        courseName: req.body.name,
        instructorName: req.body.instructorName,
        msgv: req.body.msgv,
        credit: req.body.credit,
        scheduleDay: req.body.scheduleDay,
        scheduleTime: req.body.scheduleTime,
        scheduleWeek: req.body.scheduleWeek,
        sotinhchi: req.body.sotinhchi,
        tinhchihocphi: req.body.tinhchihocphi,
        STT: req.body.STT,
        classroom: req.body.classroom,
        midterm: req.body.midterm,
        final: req.body.final,
   });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Update an existing course
const updateCourse = async (req, res) => {
  try {
    const courseUpdate = {
      semester: req.body.semester,
      courseCode: req.body.courseCode,
      courseName: req.body.name,
      instructorName: req.body.instructorName,
      msgv: req.body.msgv,
      credit: req.body.credit,
      scheduleDay: req.body.scheduleDay,
      scheduleTime: req.body.scheduleTime,
      scheduleWeek: req.body.scheduleWeek,
      sotinhchi: req.body.sotinhchi,
      tinhchihocphi: req.body.tinhchihocphi,
      STT: req.body.STT,
      classroom: req.body.classroom,
      midterm: req.body.midterm,
      final: req.body.final,
    };

    const course = await Course.findOneAndUpdate({ courseCode: req.params.courseCode }, courseUpdate, { new: true });

    if (!course) {
      return res.status(404).send();
    }

    res.send(course);
  } catch (e) {
    res.status(400).send(e);
  }
};


// Delete a course
const deleteCourse = async (req, res) => {
  try {
      const { courseCode } = req.params; 
      const deletedCourse = await Course.findOneAndDelete({ courseCode: courseCode });
      
      if (!deletedCourse) {
          return res.status(404).send('Course not found');
      }

      res.status(204).send('Success');  // No content to send back, but indicate success
  } catch (error) {
      res.status(500).send(error.message);
  }
};

// Export the controller functions
module.exports = {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse
};
