const mongoose = require("mongoose");

module.exports = async function connectMongo(uri) {
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,  // Handle slow connections
            socketTimeoutMS: 45000,
        });

        console.log("MongoDB Connected Successfully!");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1); // Stop the process if the DB connection fails
    }
};
