import Crop from "../model/crop.js";
import User from "../model/usermodel.js";

// ➕ Add new crop
export const addCrop = async (req, res) => {
  try {
    const {
      cropType,
      fertilizerUsed,
      yield: cropYield,
      lastFertilizingDate,
      lastPestDate,
    } = req.body;

    const userId = req.user.id;

    if (!cropType || !fertilizerUsed || !cropYield) {
      return res.status(400).json({ message: "Crop type, fertilizer, and yield are required" });
    }

    const user = await User.findById(userId).select("name email");
    if (!user) return res.status(404).json({ message: "User not found" });

    const newCrop = new Crop({
      userId,
      username: user.name,
      email: user.email,
      cropType,
      fertilizerUsed,
      yield: cropYield,
      lastFertilizingDate: lastFertilizingDate || null,
      lastPestDate: lastPestDate || null,
    });

    await newCrop.save();
    res.status(201).json(newCrop);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 📖 Get crops for logged-in user
export const getCropsByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const crops = await Crop.find({ userId }).sort({ createdAt: -1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🗑 Delete a crop
export const deleteCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deleted = await Crop.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res.status(404).json({ message: "Crop not found or not authorized" });
    }

    res.json({ message: "Crop deleted successfully", deleted });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✏️ Update crop
export const updateCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const {
      cropType,
      fertilizerUsed,
      yield: cropYield,
      lastFertilizingDate,
      lastPestDate,
    } = req.body;

    const updated = await Crop.findOneAndUpdate(
      { _id: id, userId },
      {
        cropType,
        fertilizerUsed,
        yield: cropYield,
        lastFertilizingDate: lastFertilizingDate || null,
        lastPestDate: lastPestDate || null,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Crop not found or not authorized" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 📖 Get all crops (admin)
export const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find().sort({ createdAt: -1 });
    res.json({ crops });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
