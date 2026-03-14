const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "FirstName are required"],
    },
    last_name: {
      type: String,
      required: [true, "LastName are required"],
    },
    city: {
      type: String,
    },
    zip_code: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    house_number: {
      type: Number,
      required: true,
    },
    local_number: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);
const Customer = mongoose.model("Customer", customersSchema);
module.exports = Customer;
