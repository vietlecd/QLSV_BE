const SinhVienModel = require('../../../models/student.model');

module.exports.dashboard = async (req, res) => {
    try {
        const SinhVien = await SinhVienModel.find()
        .select({
            _id: 0,
            name: 1,
            mssv: 1,
            email: 1,
            training_info: 1,
            courseEnroll: 1
        });
        console.log(SinhVien);
        res.json(SinhVien); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};