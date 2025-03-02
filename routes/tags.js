import express from "express";
import fs from "fs";

const router = express.Router();
const tagsFile = "./data/tags.json";

const readData = () => {
  const data = fs.readFileSync(tagsFile, "utf-8");
  return JSON.parse(data);
};

//get /tags
router.get("/", (_req, res) => {
  try {
    const tags = readData();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error reading tags data", error });
  }
});

export default router;
