import { DataTypes } from 'sequelize';  
import sequelize from '../database/db.js';

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
export default Product;
