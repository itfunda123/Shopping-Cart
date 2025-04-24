// backend/seed.js
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected...');
  return seedData();
})
.catch(err => console.error('MongoDB connection error:', err));

const seedProducts = [
  {
    name: "Cool T-Shirt",
    price: 29.99,
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fkingscollection.co.ke%2Fproduct%2Fsport-t-shirts-698%2F&psig=AOvVaw3vg4RX1nKgXTlJ9u9lD8F5&ust=1745569479460000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOjf55if8IwDFQAAAAAdAAAAABAE",
    description: "A stylish t-shirt for your everyday look."
  },
  {
    name: "Sneakers",
    price: 59.99,
    image: "https://via.placeholder.com/800x400/33FF57/FFFFFF",
    description: "Comfortable and trendy sneakers."
  },
  {
    name: "Denim Jacket",
    price: 89.99,
    image: "https://www.mytheresa.com/media/1094/1238/100/8f/P01031609.jpg",
    description: "Classic denim for all seasons."
  }
];

async function seedData() {
  try {
    await Product.deleteMany(); // Clears the existing products
    await Product.insertMany(seedProducts);
    console.log("Seed data inserted!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
