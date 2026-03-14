const express = require("express");
const {createReview, getReviews, getReviewById, updateReview, deleteReview} = require("../controller/review.controller");
const reviewRouter = express.Router();

reviewRouter.route('/')
    .post(createReview)
    .get(getReviews);

reviewRouter.route('/:id')
    .get(getReviewById)
    .put(updateReview)
    .delete(deleteReview);

module.exports = reviewRouter;  