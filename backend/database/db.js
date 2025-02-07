import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Setting up the Sequelize connection to PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,        
  process.env.DB_USER,        
  process.env.DB_PASSWORD,    
  {
    host: process.env.DB_HOST,  
    port: process.env.DB_PORT,  
    dialect: "postgres",        
    logging: false,             // Disable SQL query logging (optional)
  }
);

export default sequelize;
