import express from 'express';
import cors from 'cors';
import 'dotenv/config';


//define a port
const port=process.env.PORT ?? 5050;

//create an express instance
const app = express();

//enable CORS
app.use(cors());

//serve static files
app.use(express.static("public"));

// parses JSON in the request body and adds it as `req.body`
app.use(express.json());


//standalone requests
app.get('/',(_req,res)=>{
    res.send("<h1>Welcome to Snaps!</h1>");
})


app.listen(port,()=>{
    console.log(`Server listening on port:${port}`);
});