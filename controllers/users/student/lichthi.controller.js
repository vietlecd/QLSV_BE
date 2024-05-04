const student = require("../../../models/student.model");
const course = require("../../../models/course.model")

// Get all lich thi of all courseEnrolled
const getAllLichThi = async (req, res) => {
    const {mssv} = req.user
    try {
        const sv_filter = {"mssv": mssv};
        const st = await student.aggregate([
            //Get student with mssv
            {$match: sv_filter},
            //Bring out elements inside courseEnrolled 
            //of the student
            {$unwind: "$courseEnroll"},
            {$replaceRoot: {newRoot: "$courseEnroll"} },
            //Left outer join with course model
            //and store result in lichthi array
            {$lookup: {
                from: course.collection.collectionName,
                localField: "courseCode",
                foreignField: "courseCode",
                as: "lichthi",
            }},
            //Bring out elements inside lichthi
            {$unwind: "$lichthi"},
            {$replaceRoot: {newRoot: "$lichthi"} },
            //Get needed info
            {$project: {
                "_id": 0,
                "semester": 1,
                "courseCode": 1,
                "credit": 1,
                "midterm": 1,
                "final": 1
            }}
        ]);
        res.json(st);
    } catch (error) {
        res.json({ message: error });
    }
};

//Get info of a lich thi of courseEnrolled in a semester
const getLichThi = async (req, res) => {
    const {mssv} = req.user
    const { semester } = req.params;
    try {
        const sv_filter = {"mssv": mssv};
        const sem_filter = {"semester": semester}
        const st = await student.aggregate([
            //Get student with mssv
            {$match: sv_filter},
            //Bring out elements inside courseEnrolled 
            //of the student
            {$unwind: "$courseEnroll"},
            {$replaceRoot: {newRoot: "$courseEnroll"} },
            //Limit course enrolled in the input semester
            {$match: sem_filter},
            //Left outer join with course model
            //and store result in lichthi array
            {$lookup: {
                from: 'courses',
                localField: "courseCode",
                foreignField: "courseCode",
                as: "lichthi",
            }},
            //Bring out elements inside lichthi
            {$unwind: "$lichthi"},
            {$replaceRoot: {newRoot: "$lichthi"} },
            //Get needed info
            {$project: {
                "_id": 0,
                "semester": 1,
                "courseCode": 1,
                "credit": 1,
                "midterm": 1,
                "final": 1
            }},
        ]);
        res.json(st);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllLichThi, getLichThi };