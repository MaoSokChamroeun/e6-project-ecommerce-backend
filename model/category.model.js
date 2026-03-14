const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category are required"],
    },

    slug: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["open", "close"],
      default: "open",
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;