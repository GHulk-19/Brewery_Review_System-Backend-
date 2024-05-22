const mongoose = require("mongoose");

// Define the schema for the review card collection
const reviewSchema = new mongoose.Schema({
  reviewID: {
    type: String, 
    required: true,
    unique: true,
  },
  reviewArray: [
    {
      owner: {
        type: String,
        
      },
      review: {
        type: String,
        required: true,
      },
      rated: {
        type: Number,
        required: true,
      },
      
    },
  ],
  overallRating: {
    type: Number,
    min: 1,
    max: 5,
  },
});


const db = mongoose.model("ReviewDB", reviewSchema);

module.exports = db;
