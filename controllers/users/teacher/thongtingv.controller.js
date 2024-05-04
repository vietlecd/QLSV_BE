const teacher = require('../../../models/teacher.model');

module.exports.dashboard = async (req, res) => {
    const {msgv} = req.user
    try {
        const tea = await teacher.findOne({"msgv": msgv})
        .select({"password": 0, "passwordChanged": 0});
        res.json(tea); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};

module.exports.updatePicture = async (req, res) => {
    const {msgv} = req.user
    try {
        const find_filter = {"msgv": msgv}
        const update_filter = {$set: {"image": req.body.image}};
        const update_option = {new: true}
        const picup = await teacher.updateOne(find_filter, update_filter, update_option);
        if(!picup){
            return res(400).send('Cannot update picture!')
        }
        res.json(picup); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
  };

module.exports.updateTeacher = async (req, res) => {
    const {msgv} = req.user
    try {
        const teacherUpdated = {
            name: req.body.name,
            email: req.body.email,
            private_info: req.body.private_info,
            contact_info: req.body.contact_info
        }

        const tea = await teacher.updateOne({ "msgv": msgv }, teacherUpdated, { new: true });

        if (!tea) {
            return res.status(404).send();
        }
        res.json(tea);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};