const mongoose = require("mongoose");

const bottomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name Banner Required"],
    },
    image: {
        type: String
    },
    
});

module.exports = mongoose.model("Bottom", bottomSchema);