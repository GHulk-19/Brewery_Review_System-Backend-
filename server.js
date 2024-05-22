const express = require("express")
const cors = require('cors')
require('dotenv').config();
const { connectTOMongoDB } = require("./connect")
const app = express()
const bodyParser = require('body-parser');
const mongoURI = process.env.MONGO_URI

const PORT = 5000
const apiRoutes = require('./routes/review')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }))
connectTOMongoDB(mongoURI)

app.get("/",(req,res)=>{
    res.send("All is well!")
} );
app.use("/api",apiRoutes);




app.listen(PORT, () => {
    console.log("Server is running at", PORT);
});