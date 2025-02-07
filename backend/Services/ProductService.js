import Product from "../Models/Product.js"
import { Op } from "sequelize";

export const fetchAllProducts = async () => {
  return await Product.findAll();
};

export const searchProducts = async (query) => {
  return await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${query}%`
      }
    }
  });
};

export const createProduct = async (name) => {
  return await Product.create({ name });
};

export const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error(`Product with id ${id} not found`);
  await product.destroy();
};
