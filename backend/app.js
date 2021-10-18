import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express"
import cors from "cors"
import productRoutes from "./routes/product.js"
import authRoutes from "./routes/auth.js"
import uploadRoutes from "./routes/uploadItem.js"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        key: "user",
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

mongoose.connect(
    'mongodb://localhost:27017/exchangeDB',
    {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }
).then(console.log('Database connected')).catch((err)=>console.log(err));

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('Server listening at port 5000');
})


app.use("/products", productRoutes);
app.use("/sell", uploadRoutes);
app.use("/", authRoutes);

app.get("/",(req,res)=>{
    res.send('Working!!');
});


app.use("*", (req,res) =>{
    return res.status(404).json({error: "not found"});
});












