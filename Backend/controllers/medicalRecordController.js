import MedicalRecord from "../models/MedicalRecord.js";

export const uploadMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.create({
      user: req.user._id,
      filename: req.file.filename,
      originalname: req.file.originalname,
    });
    res.status(201).json(record);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload medical record" });
  }
};

export const getUserRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ user: req.user._id }).sort({ uploadedAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (record) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Deletion failed" });
  }
};
