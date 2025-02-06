const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');  // Import the Sequelize connection

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,  // Required field
  }
});
module.exports = Product;