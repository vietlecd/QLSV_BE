const course = require('../../../models/course.model')
const student = require('../../../models/student.model')

module.exports.dashboard = async (req, res) => {
    const {mssv} = req.user
    try {
        const st = await student.findOne({ "mssv": mssv })
        const courseRet = st.courseEnroll;
        if (!courseRet) {
          return res.status(404).send();
        }
        res.send(courseRet);
      } catch (e) {
        res.status(400).send(e);
    }
};


//View a course's description
module.exports.viewCourseDescription = async (req, res) => {
    const {courseCode} = req.params;
    try {
      const find_filter = {"courseCode": courseCode}
      const courseRet = await course.findOne(find_filter);
      if (!courseRet) {
        return res.status(404).send();
      }
      res.send(courseRet);
    } catch (e) {
      res.status(400).send(e);
  }
}