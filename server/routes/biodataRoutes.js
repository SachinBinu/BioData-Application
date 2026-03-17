
import express from "express";
import {createBiodata,getMyBiodata,getAllBiodata} from "../controllers/biodataController.js";
import {protect,adminOnly} from "../middleware/authMiddleware.js";
import {upload} from "../middleware/upload.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), createBiodata);
router.get("/me", protect, getMyBiodata);
router.get("/admin", protect, adminOnly, getAllBiodata);

export default router;
