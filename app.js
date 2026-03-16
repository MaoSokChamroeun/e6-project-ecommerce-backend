const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors')
dotenv.config({ path: "./config.env" });
const dbConnection = require("./database/dbConnection");
const cookieParser = require("cookie-parser");
const categoryRouter = require("./routes/category.route");
const createRouter = require("./routes/customer.route");
const productRouter = require("./routes/product.route");
const reviewRouter = require("./routes/review.route");
const userRouter = require("./routes/user.route");
const orderRouter = require("./routes/order.route");
const inventoryRouter = require("./routes/inventory.route");
const paymentRouter = require("./routes/payment.route");
const clientRouter = require("./routes/client.route");
const cartRouter = require("./routes/cart.route");
const app = express();
const axios = require("axios");
const favoriteRouter = require("./routes/favorite.route");
app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dbConnection();

if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    axios.get('https://e6-project-ecommerce-backend.onrender.com/ping')
      .then(() => console.log('Keep-alive ping sent!' , Date.now()))
      .catch((err) => console.log('Ping failed:', err.message));
  }, 300000);
}
app.use('/products', express.static('public/products'));
app.use("/api/category", categoryRouter);
app.use("/api/customer", createRouter);
app.use("/api/product", productRouter);
app.use("/api/review", reviewRouter);
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);
app.use("/api/inventory" , inventoryRouter )
app.use("/api/payment" , paymentRouter)
app.use("/api/favorite" , favoriteRouter)
app.use("/api/user/cart" , cartRouter)

//user usign app

app.use("/api/user/client" , clientRouter)
module.exports = app;
