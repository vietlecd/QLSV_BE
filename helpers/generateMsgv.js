const Teacher = require('../models/teacher.model');

// Generate a unique msgv
const generateUniqueMsgv = async () => {
    let msgv = "";
    let isUnique = false;

    while (!isUnique) {
        msgv = generateRandomMsgv();
        const existingStudent = await Teacher.findOne({ msgv: msgv });

        if (!existingStudent) {
            isUnique = true;
        }
    }

    return msgv;
};

// Generate a random msgv
const generateRandomMsgv = () => {
    const min = 2210000;
    const max = 2219999;
    const randomMsgv = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomMsgv.toString();
};

module.exports = {
    generateUniqueMsgv
};