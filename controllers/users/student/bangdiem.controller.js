const bangdiemModel = require("../../../models/course.model");
const student = require("../../../models/student.model")

const getbangdiem = async (req, res) => {
    const { mssv } = req.user;
    try {
        const sv_filter = {"mssv": mssv};
        const st = await student.findOne(sv_filter)
        const cou = st.courseEnroll;
        if (!cou) {
            return res.status(404).json({ message: "Bang diem not found." });
        }
        res.send(cou);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getbangdiemBySem = async (req, res) => {
    const { mssv } = req.user;
    const { semester } = req.params
    try {
        const sv_filter = {"mssv": mssv};
        const sem_filter = {"semester": semester}
        const cou = await student.aggregate([
            {$match: sv_filter},
            {$unwind: "$courseEnroll"},
            {$replaceRoot: {newRoot: "$courseEnroll"}},
            {$match: sem_filter}
        ])
        if (!cou) {
            return res.status(404).json({ message: "Bang diem not found." });
        }
        res.send(cou);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getbangdiem, getbangdiemBySem };