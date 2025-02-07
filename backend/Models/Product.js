const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');  

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,  
  }
});
module.exports = Product;