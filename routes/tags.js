import {Router} from "express";
import fs from "fs";

const router=Router();
const tagsFile="./data/tags.json";

const readData = async () => JSON.parse(await fs.readFile(tagsFile, "utf-8"));

//get /tags
router.get("/", async (req,res) =>{
    try{
        const tags = await readData();
        res.json(tags);
    } catch (error) {
        res.status(500).json({message:"Error reading tags data", error});
    }
});

export default router;