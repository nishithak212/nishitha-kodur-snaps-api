import express from "express";
import cors from "cors";
import "dotenv/config";
import photoRoutes from "./routes/photos.js";
import tagsRoutes from "./routes/tags.js";

//define a port
const port = process.env.PORT ?? 5050;

//create an express instance
const app = express();

//enable CORS
app.use(cors());

//serve static files
app.use(express.static("public"));

// parses JSON in the request body and adds it as `req.body`
app.use(express.json());

//Static files
app.use(express.static("public")); //--general static files
app.use("/photos", express.static("public/photos")); //--serve images

//Use routes
app.use("/photos", photoRoutes);
app.use("/tags", tagsRoutes);

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
