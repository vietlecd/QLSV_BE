const mongoose = require('mongoose');
const course = require('./models/course.model');
const student = require('./models/student.model');
const courseSemester = require('./models/courseInSemester.model');

mongoose.connect("mongodb+srv://viewer123:keytovictory@dbtest.qfdz0ns.mongodb.net/?retryWrites=true&w=majority");
const findUpdateOption = {new: true, upsert: true};
async function createExampleCourse(){
    const mh1_filter = {courseCode: 'MT2008'}
    const mh1_update = {
       $set: {
            semester: 'HK123',
            courseCode: 'MT2008',
            name: 'LTNC',
            credit: 2,
        }
    };
    const mh1 = await course.findOneAndUpdate(mh1_filter, mh1_update, findUpdateOption);
    //console.log(mh1);
    const mh2_filter = {courseCode: 'MT2009'};
    const mh2_update = {
        $set: {
            semester: 'HK123',
            courseCode: 'MT2009',
            name: 'DSA',
            credit: '3'
        }
    };
    const mh2 = await course.findOneAndUpdate(mh2_filter, mh2_update, findUpdateOption);
    //console.log(mh2);

    const mh3_filter = {courseCode: 'MT2010'};
    const mh3_update = {
        $set: {
            semester: 'HK123',
            courseCode: 'MT2010',
            name: 'CA',
            credit: 3
        }
    };
    const mh3 = await course.findOneAndUpdate(mh3_filter, mh3_update, findUpdateOption);
    //console.log(mh3)
    return true;
}

async function createExampleStudent() {
    const cou1 = await course.findOne({courseCode: 'MT2008'});
    const cou2 = await course.findOne({courseCode: 'MT2009'});
    const cou3 = await course.findOne({courseCode: 'MT2010'});

    const reg_cou1 = {
        courseId: cou1._id, 
        semester: cou1.semester, 
        courseCode: cou1.courseCode
    }
    const reg_cou2 = {
        courseId: cou2._id, 
        semester: cou2.semester, 
        courseCode: cou2.courseCode
    }
    const st1_filter = {mssv: '123456'}
    const st1_update = {
        $set: 
        {
            name: 'Grift',
            email: 'hawkband@email.com',
            password: 'gutbabe',
            mssv: '123456',
            private_info:{
                gioiTinh: 'Nam'
            },
            training_info:{
                namNhapHoc: 2022
            },
            courseEnroll:[reg_cou1, reg_cou2]
        }
    };

    const st1 = await student.findOneAndUpdate(st1_filter, st1_update, findUpdateOption);
    //console.log(st1);
    
    const st2_filter = {mssv: '654321'}
    const st2_update = {
        $set: {
            name: 'VuaBritain',
            email: 'lucius@yahoo.com',
            password: 'artorius',
            mssv: '654321',
            private_info:{
                gioiTinh: 'Nam'
            },
            training_info:{
                namNhapHoc: '2023'
            },
            courseEnroll: [reg_cou2]
        }
    };
    const st2 = await student.findOneAndUpdate(st2_filter, st2_update, findUpdateOption);
    //console.log(st2)
    return true;
}

async function createExampleCourseSem(){
    const cou1 = await course.findOne({courseCode: 'MT2008'});
    const cou2 = await course.findOne({courseCode: 'MT2009'});
    const cou3 = await course.findOne({courseCode: 'MT2010'});
    
    const cr1_filter = {semester: 'HK222'}
    const cr1_update = {
        courseId: cou1._id, semester: 
        cou1.semester, 
        courseCode: cou1.courseCode
    }
    const cr1 = await courseSemester.findOneAndUpdate(cr1_filter, cr1_update, findUpdateOption);
    //console.log(cr1);

    const cr2_filter = {semester: 'HK123'}
    const cr2_update = {
        courseId: cou2._id, 
        semester: cou2.semester, 
        courseCode: cou2.courseCode
    }
    const cr2 = await courseSemester.findOneAndUpdate(cr2_filter, cr2_update, findUpdateOption);
    //console.log(cr2);
    return true;
}

(async function main () {
    await createExampleCourse();
    await createExampleStudent();
    await createExampleCourseSem();

    const stu_find = {"mssv": "123456", "courseEnroll.courseCode": "MT2009"};
    const stu_update = {$set: {"courseEnroll.$.grade": {
        lab: 5,
        midterm: 7,
        final: 7.5
    }}}
    const stu_option = {new: true};
    const courseRet = await student.updateOne(stu_find, stu_update, stu_option);
    console.log(courseRet);
    const stu = await student.findOne(stu_find);
    console.log(stu);
})();