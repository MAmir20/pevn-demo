import { fetchAllProducts, searchProducts, createProduct, deleteProduct, updateProduct } from "../Services/ProductService.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await fetchAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const products = await searchProducts(req.query.q);
    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = await createProduct(req.body.name);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
export const editProduct = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body.name);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error editing product:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
