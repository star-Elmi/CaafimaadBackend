import express from "express";
import {
  addDoctor,
  getDoctors,
  getDoctorById,
  deleteDoctor,
  updateDoctor, // ✅ Add this
} from "../controllers/doctorController.js";

const router = express.Router();

router.post("/", addDoctor);
router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.put("/:id", updateDoctor); // ✅ Add this line
router.delete("/:id", deleteDoctor);

export default router;
