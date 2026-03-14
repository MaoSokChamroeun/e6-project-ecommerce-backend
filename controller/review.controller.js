const Review = require("../model/review.model");

const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    return res.status(201).json({
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "firtName lastName")
      .populate("product")
      .populate("category");
    return res.status(200).json({
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getReviewById = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Review.findById(id).populate("user product category");
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
