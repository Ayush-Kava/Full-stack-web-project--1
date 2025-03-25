const { text } = require("body-parser");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{ 
        type: String,
        required:true
    }
});

const userModel = mongoose.model("user-data",userSchema);

module.exports = {
    userModel
}