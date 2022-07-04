import express from "express";
import {
  // getOneUser,
  uploadUserPicture,
  signUp,
  logIn,
  // getProfile,
  addGarden,
  getProfileByUserId,
  volunteerForGarden,
} from "../controller/usersController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();

// router.get("/:user", getOneUser);
// router.post("/imageUpload", multerUploads.single("image"), uploadUserPicture);

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/profile", jwtAuth, getProfileByUserId);

router.post("/addgarden", jwtAuth, multerUploads.single("image"), addGarden);
router.get("/getpostedgardens", jwtAuth, getProfileByUserId);
router.post("/volunteerforgarden", jwtAuth, volunteerForGarden);
router.get("/getvolunteeredgardens", jwtAuth, getProfileByUserId);

export default router;
