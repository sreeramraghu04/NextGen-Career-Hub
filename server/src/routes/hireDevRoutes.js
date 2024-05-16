import {
  getAllUsers,
  createUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  userLogin,
  downloadResume,
} from "../controllers/userController";
import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getIndividualJobs,
  searchJob,
  applyJob,
  viewApplicants,
  checkJobApplicationStatus,
} from "../controllers/jobsController";
import {
  addQuestionsToMockTest,
  attendMockTest,
  createMocktest,
  createQuestion,
  deleteMockTest,
  getAllMockTests,
  getAllQuestions,
  getMockTestsByUser,
  getSingleMockTest,
  viewMockTestMarks,
} from "../controllers/mocktestController";
import multer from "multer";
import path from "path";
import fs from "fs";

// Set up directory for uploaded files
const uploadDir = "./uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up storage for uploaded resumes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Set up multer middleware
const upload = multer({ storage });

const routes = (app) => {
  app
    .route("/user")
    .get(getAllUsers)
    .post(upload.single("resumeFile"), createUser)
    .put(updateUserProfile);
  app.route("/user/:id").get(getUserProfile).delete(deleteUserProfile);
  app.route("/user/login").post(userLogin),
    app.route("/jobs/new").post(createJob),
    app.route("/jobs").get(getAllJobs);
  app.route("/jobs/apply/").post(applyJob);
  app.route("/jobs/applicants/").get(viewApplicants);
  app.route("/jobs/individual").get(getIndividualJobs);
  app.route("/jobs/:id").put(updateJob).delete(deleteJob);
  app.route("/jobs/check").get(checkJobApplicationStatus);
  app.route("/search").get(searchJob);
  app.route("/mocktest/create").post(createMocktest);
  app.route("/mocktest/all").get(getAllMockTests);
  app.route("/mocktest/delete").delete(deleteMockTest);
  app.route("/mocktest/user").get(getMockTestsByUser);
  app.route("/mocktest/question").post(createQuestion);
  app.route("/mocktest/question/all").get(getAllQuestions);
  app.route("/mocktest/add").post(addQuestionsToMockTest);
  app.route("/mocktest/attend").post(attendMockTest);
  app.route("/mocktest/single").get(getSingleMockTest);
  app.route("/mocktest/result").get(viewMockTestMarks);
  app.route("/downloadResume").get(downloadResume);
};

export default routes;
