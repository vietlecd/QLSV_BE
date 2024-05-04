// Add a new course
const course = require('../../../models/course.model');
const student = require('../../../models/student.model')

const viewAvailableCourse = async (req, res) => {
  try {
    const select_filter = {
      midterm: 0,
      final: 0
    }
    const courseRet = await course.find().select(select_filter)
    if (!courseRet) {
      return res.status(404).send();
    }
    res.json(courseRet);
  } catch (e) {
    res.status(400).send(e);
}
}

const viewCourseReg = async (req, res) => {
  const {mssv} = req.user
  try {
    const stu = await student.findOne({"mssv": mssv});
    const courseRet = student.courseReg
    if (!courseRet) {
      return res.status(404).send();
    }
    res.json(courseRet);
  } catch (e) {
    res.status(400).send(e);
  }
}

//Add a course registered
const addCourseReg = async (req, res) => {
  const {courseCode} = req.params
  try {
      
      const mssv = req.user.mssv;
      const isExist = await student.findOne({
        "mssv": mssv,
        $or: [
          {"courseEnroll.courseCode": courseCode},
          {"courseReg.courseCode": courseCode}
        ]
      });
      if (isExist){
        return res.status(400).send("The course has already been enrolled/registered!");
      }
      const course_match = await course.findOne({courseCode: courseCode}); 
      const newCouSem = {
          courseId: course_match._id,
          semester: course_match.semester,
          courseCode: course_match.courseCode,
          credit: course_match.credit,
          instructorName: course_match.instructorName,
          msgv: course_match.msgv
      }
      const find_filter = {mssv: mssv};
      const update_filter = {$push: {courseReg: newCouSem} };
      const option = {new: true};
      const courseRet = await student.updateOne(find_filter, update_filter, option);
      if (!courseRet) {
        return res.status(404).send();
      }
      res.json(courseRet);
    } catch (e) {
      res.status(400).send(e);
  }
}

//Delete a course registered by a student
const deleteCourseReg = async (req, res) => {
  const {courseCode} = req.params
  try {
      const mssv = req.user.mssv;
      const find_filter = {"mssv": mssv};
      const update_filter = {$pull: {courseReg: {"courseCode": req.body.courseCode}} };
      const option = {};
      const courseRet = await student.updateMany(find_filter, update_filter, option);
      if (!courseRet) {
        return res.status(404).send();
      }
      res.json(courseRet);
    } catch (e) {
      res.status(400).send(e);
  }
}

//Delete all course registered by a student
const deleteAllCourseReg = async (req, res) => {
  const mssv = req.user.mssv;
  try {
      const find_filter = {"mssv": mssv};
      const update_filter = {$set: {courseReg: []} };
      const option = {};
      const courseRet = await student.updateMany(find_filter, update_filter, option);
      if (!courseRet) {
        return res.status(404).send();
      }
      res.send(courseRet);
    } catch (e) {
      res.status(400).send(e);
  }
}

const confirmReg = async (req, res) => {
  const mssv = req.user.mssv;
  try {
    const find_filter = {"mssv": mssv};
    const update_option = {};
    const stu = await student.findOne(find_filter)

    //Add all registered course to enrolled course
    const enroll_update = {$push: {courseEnroll: {$each: stu.courseReg}}}
    const addEnroll = await student.updateOne(find_filter, enroll_update, update_option)
    if (!addEnroll){
      return res.status(404).send();
    }
    //Delete old registered courses
    const reg_update = {$set: {courseReg: []} };
    const courseRet = await student.updateOne(find_filter, reg_update, update_option);
    if (!courseRet) {
      return res.status(404).send();
    }
    
    // Save the enrolled courses to the course collection
    const enrollCourses = stu.courseReg.map(course => ({
      courseId: course.courseId,
      semester: course.semester,
      courseCode: course.courseCode,
      teacherName: course.teacherName
    }));
    const saveEnrollCourses = await course.insertMany(enrollCourses);
    if (!saveEnrollCourses) {
      return res.status(500).send();
    }
    
    res.json(courseRet);
  } catch (e) {
    res.status(400).send(e);
  }
}

module.exports = {
    viewAvailableCourse,
    viewCourseReg,
    addCourseReg,
    deleteCourseReg,
    deleteAllCourseReg,
    confirmReg
}