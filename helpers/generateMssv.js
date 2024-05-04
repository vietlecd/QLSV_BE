const Student = require("../models/student.model");

// Generate a unique mssv
const generateUniqueMssv = async () => {
    let mssv = "";
    let isUnique = false;

    while (!isUnique) {
        mssv = generateRandomMssv();
        const existingStudent = await Student.findOne({ mssv: mssv });

        if (!existingStudent) {
            isUnique = true;
        }
    }

    return mssv;
};

// Generate a random mssv
const generateRandomMssv = () => {
    const min = 2210000;
    const max = 2219999;
    const randomMssv = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomMssv.toString();
};

module.exports = {
    generateUniqueMssv
};