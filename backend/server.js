import express from "express";
import cors from "cors";
import sequelize from "./database/db.js"; 
import ProductRoutes from "./Routes/ProductRoutes.js"
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/Product", ProductRoutes);

// Database Connection
sequelize.sync()
  .then(() => console.log(" Database synced successfully"))
  .catch((err) => console.error(" Error syncing database:", err));

// Start Server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
