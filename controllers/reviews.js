const db = require("../models/review");

async function handleNewReviews(req, res) {
    console.log("hello")
  const { newReview, rating, id, user } = req.body;
 console.log(newReview, rating, id, user )
  try {
    if (!newReview || !rating || !id) {
      return res.status(400).json({ error: "data is missing" });
    }

    // Check if a card with the given ID already exists in the database
    const existingReview = await db.findOne({ reviewID: id });

    if (existingReview) {
      // If the card exists, add the new review to the reviewArray and update the rating
      existingReview.reviewArray.push({ owner: req.user.username,review: newReview, rated: rating });

      // Recalculate overallRating based on the sum of all rated values
      const totalRated = existingReview.reviewArray.reduce(
        (acc, review) => acc + review.rated,
        0
      );
      existingReview.overallRating =
        totalRated / existingReview.reviewArray.length;

      // Save the updated review
      await existingReview.save();

      return res
        .status(200)
        .json({
          message: "Review added to existing card",
          review: existingReview,
        });
    } else {
      // If the card doesn't exist, create a new card with the provided details
      const newReviews = await db.create({
        
        reviewID: id,
        reviewArray: [{ owner: req.user.username,review: newReview, rated: rating }],
        overallRating: rating,
      });

      return res
        .status(201)
        .json({ message: "New card created with review", review: newReviews });
    }
  } catch (error) {
    console.error("Error handling new reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function handleReviews(req, res) {
  const { id } = req.params;

  try {
    // Find the card with the provided ID in the database
    const existingReview = await db.findOne({ reviewID: id });

    if (existingReview) {
      const reviews = existingReview.reviewArray;
      const overallRating = existingReview.overallRating;
      return res.status(200).json({ reviews, overallRating });
    } else {
      // If the card doesn't exist, return an appropriate response
      return res
        .status(404)
        .json({ error: "Review not found with the provided ID" });
    }
  } catch (error) {
    console.error("Error handling reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  handleNewReviews,
  handleReviews,
};
