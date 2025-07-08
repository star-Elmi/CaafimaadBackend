import XLSX from "xlsx";
import path from "path";
import stringSimilarity from "string-similarity";

// Load Excel file once
const filePath = path.resolve("data/full_dataset_cleaned_suaalo_jawaabo.xlsx");
const workbook = XLSX.readFile(filePath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

/**
 * Get the most accurate Jawaab based on predicted label + question text
 * @param {string} label - The predicted intent (e.g., "definition")
 * @param {string} userMessage - The user's actual question (e.g., "Waa maxay HIV?")
 * @returns {string} The most relevant Jawaab
 */
export const getAnswerByLabel = (label, userMessage) => {
  const matches = data.filter((item) => item.Label === label);

  if (matches.length === 0) {
    return "Waan ka xumahay, jawaab sax ah lama helin.";
  }

  // Try to get a keyword (last word or second word)
  const userWords = userMessage.toLowerCase().split(" ");
  const keyword = userWords.find(w => w.length > 2 && w !== "waa" && w !== "maxay");

  // First filter by keyword match if possible
  const keywordMatches = matches.filter((item) =>
    item.Suaal.toLowerCase().includes(keyword)
  );

  const filtered = keywordMatches.length > 0 ? keywordMatches : matches;
  const questions = filtered.map((item) => item.Suaal);

  const bestMatch = stringSimilarity.findBestMatch(userMessage, questions).bestMatch;
  const bestIndex = filtered.findIndex((item) => item.Suaal === bestMatch.target);

  return filtered[bestIndex]?.Jawaab || "Waan ka xumahay, jawaab sax ah lama helin.";
};
