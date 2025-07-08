import express from "express";
import { upload } from "../middlewares/uploadMiddleware.js";
import {
  uploadMedicalRecord,
  getUserRecords,
  deleteRecord,
} from "../controllers/medicalRecordController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadMedicalRecord);
router.get("/my-records", protect, getUserRecords);
router.delete("/:id", protect, deleteRecord);

export default router;
