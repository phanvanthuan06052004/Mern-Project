import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from "./src/Books/book.route.js";


dotenv.config();
const app = express()
const port = process.env.PORT;

//middleware
app.use(express.json());
// config cors cho phep giao tiep o phuong thuc khac nhau
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

//config routes
app.use("/api/books", routes)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})