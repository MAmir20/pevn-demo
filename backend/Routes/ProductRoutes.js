import express from "express";
import { getAllProducts, getProduct, searchProduct, addProduct, removeProduct, editProduct } from "../Controllers/ProductController.js";

const router = express.Router();

router.get("/get/:id", getProduct);
router.get("/getAll", getAllProducts);
router.get("/search", searchProduct);
router.post("/addproducts", addProduct);
router.delete("/deleteproducts/:id", removeProduct);
router.put("/editproducts/:id", editProduct);

export default router;
