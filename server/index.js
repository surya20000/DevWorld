require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mediaRoutes = require('./routes/media');
const cors = require('cors');
const path = require('path'); 

app.use(cors());
app.use(express.json());


app.use('/api/v1/media', mediaRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.mongoDbUri, { dbName: "Capstone" })
    .then(() => [
        console.log("Connected to MongoDB")
    ])
    .catch((err) => console.log(err));

app.listen(process.env.port || 6000, () => {
    console.log("Server is up and running at port:", process.env.port);
});
