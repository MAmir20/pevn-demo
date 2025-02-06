const { Sequelize } = require('sequelize');
require('dotenv').config();

// Setting up the Sequelize connection to PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,        // Database name
  process.env.DB_USER,        // Username
  process.env.DB_PASSWORD,    // Password
  {
    host: process.env.DB_HOST,  // localhost
    port: process.env.DB_PORT,  // Port  5432 PostgreSQL
    dialect: 'postgres',        
    logging: false,             // Disable SQL query logging (optional)
  }
);

module.exports = sequelize;
