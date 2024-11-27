import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routesBook from "./src/Books/book.route.js";
import routesOrder from "./src/Orders/order.route.js";
import routesUser from "./src/Users/user.route.js";
import routesDashboard from './src/stats/stats.route.js';
import upload from './src/UploadImg/Upload.js';

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

//config routes for books
app.use("/api/books", routesBook)

//config routes for orders
app.use("/api/order", routesOrder)

//config routes for users
app.use("/api/users", routesUser)

//config api for stats dashboard
app.use("/api/dashboard", routesDashboard)

//config routes for upload image
app.use("/api/upload", upload)

// Middleware để serve static files
app.use('/images', express.static('public/images'));

//handle connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})