const express = require('express');
const cors = require('cors');
const sequelize = require('./database/db'); // Sequelize instance
const Product = require('./Models/Product'); // Import the Product model
const { Op } = require('sequelize'); // Import Sequelize operators

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect to the database
sequelize.sync()
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error("Error syncing database:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//methode to get all products
app.get('/getAll', async (req, res) => {
  console.log(" GET /products route hit!");

  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(" Error getting products:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Search route using Sequelize
app.get('/search', async (req, res) => {
  const query = req.query.q;

  try {
    console.log('query', query);

    // Use Sequelize to search for products
    const products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%` // Case-insensitive search
        }
      }
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
//methode to add a product
app.post('/products', async (req, res) => {
  console.log("✅ POST /products route hit!");
  const { name } = req.body;

  try {
    const product = await Product.create({ name });
    res.status(201).json(product);
  } catch (error) {
    console.error(" Error adding product:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

