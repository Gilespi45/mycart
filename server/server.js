const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const purchaseRoutes = require("./routes/purchases");
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const app = express();

const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'static')));



const User = require("./models/User");
const Product = require("./models/Product");
const Purchase = require("./models/Purchase");

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mycart", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
  const mongoConnect = async () => {
    const user = await User.find({ name: "Billie" });
    console.log(user);
    const product = await Product.find({ name: "Television" });
    console.log(product);
    const purchase = await Purchase.findById("648c253e5b0867810312ce44");
    console.log(purchase);
  };
  mongoConnect();

// API routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/purchases", purchaseRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
