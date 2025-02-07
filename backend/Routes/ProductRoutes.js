import express from "express";
import { getAllProducts, searchProduct, addProduct, removeProduct } from "../Controllers/ProductController.js";

const router = express.Router();

router.get("/getAll", getAllProducts);
router.get("/search", searchProduct);
router.post("/addproducts", addProduct);
router.delete("/products/:id", removeProduct);

export default router;
