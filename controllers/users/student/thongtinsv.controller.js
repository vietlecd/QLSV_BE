const student = require('../../../models/student.model');

module.exports.dashboard = async (req, res) => {
  const {mssv} = req.user; 
  try {
        const thongtinsinhvien = await student.find({
          "mssv": mssv
        });
        res.json(thongtinsinhvien); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};

module.exports.updatePicture = async (req, res) => {
  const {mssv} = req.user
  try {
      const find_filter = {"mssv": mssv}
      const update_filter = {$set: {"image": req.body.image}};
      const update_option = {new: true}
      const picup = await student.updateOne(find_filter, update_filter, update_option);
      if(!picup){
          return res(400).send('Cannot update picture!')
      }
      res.json(picup); // send response to client
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error'); // send error response to client
  }
};

// Update an existing student
module.exports.updateStudent = async (req, res) => {
  const {mssv} = req.user
  try {
      const studentUpdated = {
          name: req.body.name,
          private_info: req.body.private_info,
          training_info: req.body.training_info,
      }

      const stu = await student.updateOne({ "mssv": mssv }, studentUpdated, { new: true });

      if (!stu) {
          return res.status(404).send();
      }
      res.send(stu);
  } catch (e) {
      res.status(400).send(e);
  }
};