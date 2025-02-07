const { Sequelize } = require('sequelize');
require('dotenv').config();

// Setting up the Sequelize connection to PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,        
  process.env.DB_USER,        
  process.env.DB_PASSWORD,    
  {
    host: process.env.DB_HOST,  
    port: process.env.DB_PORT,  
    dialect: 'postgres',        
    logging: false,             // Disable SQL query logging (optional)
  }
);

module.exports = sequelize;
