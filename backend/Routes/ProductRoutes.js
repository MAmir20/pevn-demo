import express from "express";
import { getAllProducts, searchProduct, addProduct, removeProduct, editProduct } from "../Controllers/ProductController.js";

const router = express.Router();

router.get("/getAll", getAllProducts);
router.get("/search", searchProduct);
router.post("/addproducts", addProduct);
router.delete("/products/:id", removeProduct);
router.put("/editproducts/:id", editProduct);

export default router;
