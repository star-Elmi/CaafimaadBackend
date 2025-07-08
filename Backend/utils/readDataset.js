const XLSX = require("xlsx");
const stringSimilarity = require("string-similarity");
const path = require("path");

// Load the dataset once
const workbook = XLSX.readFile(
  path.join(__dirname, "../data/full_dataset_cleaned_suaalo_jawaabo.xlsx")
);
const sheetName = workbook.SheetNames[0];
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Match user message to best question
function getBestMatchAnswer(message) {
  const questions = data.map((row) => row.Suaal);
  const matches = stringSimilarity.findBestMatch(message, questions);
  const bestMatchIndex = matches.bestMatchIndex;
  return data[bestMatchIndex]?.Jawaab || "Waan ka xumahay, ma fahmin su'aasha.";
}

module.exports = { getBestMatchAnswer };
