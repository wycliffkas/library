import express from "express";
import {
	addBook,
	listBooks,
	editBook,
	deleteBook,
	filterBooks
} from "../controllers/bookController";

const router = express.Router();

router.get("/", listBooks);
router.post("/addBook", addBook);
router.put("/books/edit/:id", editBook);
router.delete("/books/delete/:id", deleteBook);
router.get("/books/filter", filterBooks);

export default router;
