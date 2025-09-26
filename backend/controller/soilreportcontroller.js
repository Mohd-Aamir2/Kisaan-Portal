import SoilReport from "../model/soilmodel.js";

// Create a new soil report for logged-in user
export const createSoilReport = async (req, res) => {
  try {
    const { summary, recommendations, nutrients } = req.body;

    console.log("Received report from frontend:", req.body);
    console.log("Logged-in user:", req.user);

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const report = await SoilReport.create({
      userId: req.user._id,
      summary,
      recommendations,
      nutrients
    });

    console.log("Saved report in DB:", report);
    res.status(201).json(report);
  } catch (error) {
    console.error("Error saving soil report:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all reports for logged-in user
export const getSoilReports = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const reports = await SoilReport.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error("Error fetching soil reports:", error);
    res.status(500).json({ error: error.message });
  }
};
