const express= require("express");
const protect=require("../middleWare/authMiddleware");
const {authUser,viewProfile,editProfile,authRole} = require("../controller/authUser");
const {dashboard} = require("../controller/dashboard");
const {mycourses} = require("../controller/mycourses");
const {professor_dashboard} = require("../controller/Professor_Dashboard");
const {professor_mycourses,listenrolled_students} = require("../controller/Professor_mycourses");
const {courseNotes} = require("../controller/courseNotes");
const {lab_assignment,lab_submission,listlabs,listsubmissions} = require("../controller/lab_assignment");
const {getCourseRegistrationList,registerStudentPreferences} = require("../controller/course_registration");
const {roleBasedDashboard} = require('../../server/middleWare/RoleVerifier'); 

const router = express.Router();
router.route('/login').post(authUser);
router.route('/authRole').post(protect,authRole);
router.route('/viewprofile').get(viewProfile);
router.route('/editprofile').post(editProfile);
router.route('/dashboard/mycourses/notes').get(courseNotes);
router.route('/viewprofile').get(viewProfile);
router.route('/editprofile').post(editProfile);
router.route('/dashboard/mycourses/:CID/notes').get(courseNotes);





// router.route('/dashboard').get(protect,roleBasedDashboard(dashboard, professor_dashboard));
// router.route('/dashboard/mycourses').get(protect,roleBasedDashboard(mycourses, professor_mycourses));

router.route('/dashboard').get(dashboard);
router.route('/dashboard/mycourses').get(mycourses);

// professor dashboard routes
// router.route('/dashboard').get(professor_dashboard);
router.route('/dashboard/mycourses').get(professor_mycourses);
router.route('/dashboard/mycourses/:CourseId').get(listenrolled_students);

router.route('/lab_assignment').get(lab_assignment);
router.route('/course_registration').get(getCourseRegistrationList);
router.route('/course_registration').post(registerStudentPreferences);




router.route('/dashboard/mycourses/:CourseId/lab/:Lab_ID/submission').post(lab_submission);

router.route('/dashboard/mycourses/:CourseId/lab').get(listlabs);   // listing lab to both roles

router.route('/dashboard/mycourses/:CourseId/lab/assignment').post(lab_assignment);
router.route('/dashboard/mycourses/:CourseId/lab/:Lab_ID').get(listsubmissions);

module.exports=router;  
