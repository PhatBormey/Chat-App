import express from "express";
import auth from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";
const router=express.Router();

router.get("/signup",auth.getAuth)
router.get("/signup/:fullName",auth.getAuthByName)
router.post("/signup",auth.signup)
router.post("/login",auth.login)
router.post("/logout",auth.logout)


router.put("/update-profile",protectRoute,auth.updateProfilePic)

router.get("/check",protectRoute,auth.checkAuth)

export default router