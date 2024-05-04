const daotaoModel = require("../../../models/student.model");

// Get all lich thi
const getAllDaoTao = async (req, res) => {
    const { mssv } = req.user;
    try {
        const student = await daotaoModel.find({
            "mssv": mssv
        });
        if (!student) {
            return res.status(404).json({ message: "Thong tin sinh vien not found." });
        }
        const result = student.map(sv => ({
            mssv: sv.mssv,
            training_info: sv.training_info
        }));
        res.json(result);
    } catch (error) {
        res.json({ message: error });
    }
};



module.exports = { getAllDaoTao };