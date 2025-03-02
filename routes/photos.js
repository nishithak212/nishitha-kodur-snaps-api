import express from "express";
import fs from "fs";
import {v4 as uuidv4} from "uuid";

const router = express.Router();
const photosFile="./data/photos.json";


const readData = () =>{
    const data = fs.readFileSync(photosFile, "utf-8");
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(photosFile,JSON.stringify(data, null, 2));
};

//get /photos

router.get("/", (_req,res)=>{
    try{
        const photos =  readData();
        res.json(photos);
    } catch (error){
        res.status(500).json({message:"Error reading data", error: error.message});
    }
});

//get /photos/:id
router.get("/:id",  (req,res)=>{
    try{
        const photos =  readData();
        const photo = photos.find((p) => p.id === req.params.id);
        if(!photo) return res.status(404).json({message:"Photo not found"});
        res.json(photo);
    } catch (error){
        res.status(500).json({message:"Error fetching photo", error});
    }
});

//get /photos/:id/comments
router.get("/:id/comments", (req,res)=>{
    try{
        const photos =  readData();
        const photo = photos.find((p) => p.id === req.params.id);
        if(!photo) return res.status(404).json({message:"Photo not found"});
        res.json(photo.comments || []);
    } catch (error){
        res.status(500).json({message:"Error fetching comments", error});
    }
});

//post /photos/:id/comments
router.post("/:id/comments", (req,res)=>{
try{
    const {name, comment} = req.body;
    if(!name || !comment) {
        return res.status(400).json({message:"Name and comment are required"});
    }
    const photos =  readData();
    const photoIndex = photos.findIndex((p) => p.id === req.params.id);
    if(photoIndex === -1) return res.status(404).json({message:"Photo not found"});

    const newComment = {
        id:uuidv4(),
        name,
        comment,
        timestamp:Date.now(),
    };

    photos[photoIndex].comments.push(newComment);
     writeData(photos);

    res.status(201).json(newComment);
} catch (error){
    res.status(500).json({message:"Error adding comment:", error});
}
});

export default router;




