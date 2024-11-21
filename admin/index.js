require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})