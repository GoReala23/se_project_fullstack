const fs = require("fs");
const path = require("path");

// Step 1: Extract Items from db.json
const dbPath = path.join(__dirname, "frontend/src/utils/db.json");
const dbData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const itemsFromDb = dbData.items;

// Step 2: Generate New IDs
const generateNewId = (name) =>
  `default-${name.toLowerCase().replace(/\s+/g, "-")}`;

const updatedItems = itemsFromDb.map((item) => ({
  ...item,
  _id: generateNewId(item.name),
  isDefault: true,
  likes: [],
}));

// Step 3: Update the defaultClothingItems File
const defaultItemsPath = path.join(
  __dirname,
  "backend/utils/const/defaultItems.js"
);
const defaultItems = require(defaultItemsPath);

const newDefaultItems = [...defaultItems, ...updatedItems];

fs.writeFileSync(
  defaultItemsPath,
  `module.exports = ${JSON.stringify(newDefaultItems, null, 2)};`
);

console.log("Default items updated successfully.");
