import fs from "fs";

// Dummy parser for demo (replace with OCR or CSV parser)
export const parseFileAndExtractSoilValues = async (filePath) => {
  const values = {
    ph: parseFloat((5 + Math.random() * 3).toFixed(1)),
    nitrogen: Math.floor(50 + Math.random() * 200),
    phosphorus: Math.floor(10 + Math.random() * 30),
    potassium: Math.floor(100 + Math.random() * 300),
    calcium: Math.floor(200 + Math.random() * 400),
  };

  // Remove file after parsing
  fs.unlinkSync(filePath);

  return values;
};

export const generateSoilSuggestions = (v) => {
  const suggestions = [];
  const { ph, nitrogen: n, phosphorus: p, potassium: k, calcium: ca } = v;

  if (ph !== undefined) {
    if (ph < 5.5) suggestions.push("Soil is acidic. Apply lime to raise pH.");
    else if (ph > 7.5) suggestions.push("Soil is alkaline. Consider gypsum or acidifying fertilizers.");
    else suggestions.push("pH is optimal for most crops.");
  }

  if (n !== undefined) {
    if (n < 100) suggestions.push("Nitrogen is low. Apply urea or green manure.");
    else suggestions.push("Nitrogen is adequate.");
  }

  if (p !== undefined) {
    if (p < 15) suggestions.push("Phosphorus is low. Apply DAP or SSP.");
    else suggestions.push("Phosphorus is sufficient.");
  }

  if (k !== undefined) {
    if (k < 150) suggestions.push("Potassium is low. Apply potash (MOP).");
    else suggestions.push("Potassium is sufficient.");
  }

  if (ca !== undefined) {
    if (ca < 400) suggestions.push("Calcium is low. Apply gypsum or lime.");
    else suggestions.push("Calcium is adequate.");
  }

  suggestions.push("Add organic compost and rotate crops to improve fertility.");
  return suggestions;
};
