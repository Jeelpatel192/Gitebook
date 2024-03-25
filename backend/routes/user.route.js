
import express from "express";
import { getLikes, getUserProfileAndRepos, likeProfile } from "../controllers/user.controller.js";

import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const router = express.Router();

// TODO => Get likes (who liked our profile)
// TODO => Post like a profile

router.get("/profile/:username", getUserProfileAndRepos);
router.get("/likes", ensureAuthenticated, getLikes);
router.post("/like/:username", ensureAuthenticated, likeProfile);

export default router;