const express = require("express");
const mongoose = require("mongoose");
const Application = require("./application");

const app = express();
app.use(express.json());
app.use(express.static("public"));

//connecting mongo db - using mongoose
const MONGO_URI = "mongodb://127.0.0.1:27017/recruitment_db";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log(" Connected to MongoDB (recruitment_db)"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

//create
app.post("/api/applications", async (req, res) => {
  try {
    const savedApp = await new Application(req.body).save();
    res.status(201).json({ success: true, data: savedApp });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

//read
app.get("/api/applications", async (req, res) => {
  try {
    const applications = await Application.find().sort({ appliedAt: -1 });
    res
      .status(200)
      .json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//update
app.put("/api/applications/:id", async (req, res) => {
  try {
    const updatedApp = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    res.status(200).json({ success: true, data: updatedApp });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

//delete
app.delete("/api/applications/:id", async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(` RecruitmentHub live at http://localhost:${PORT}`);
});
