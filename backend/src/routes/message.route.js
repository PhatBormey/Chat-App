import express from "express";
import message from '../controllers/message.controller.js'
import { protectRoute } from "../middleware/auth.middleware.js";

const router= express.Router();
router.get("/users", protectRoute,message.getUserForSidebar);
router.get('/:id',protectRoute,message.getMessages);
router.post('/send/:id',protectRoute,message.sendMessages)
export default router 