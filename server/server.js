const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const purchaseRoutes = require("./routes/purchases");
const cors = require('cors');
const path = require('path');
const { send } = require("process");
require('dotenv').config();


const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: 'https://mycart-vercel.vercel.app' // Change this to your frontend URL
}));
app.use(express.json());
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'static')));



// const User = require("./models/User");
// const Product = require("./models/Product");
// const Purchase = require("./models/Purchase");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
  mongoConnect();

// API routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/purchases", purchaseRoutes);

app.get('/', async (req, res) => {
 
  res.json({ message: 'User added successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
