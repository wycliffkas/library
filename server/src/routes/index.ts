import express from "express";
import {
	addBook,
	listBooks,
	editBook,
	deleteBook,
	filterBooks
} from "../controllers/bookController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 * /:
 *   get:
 *     summary: List all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 books:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *         example:
 *           currentPage: 1
 *           totalPages: 1
 *           totalItems: 1
 *           books:
 *             - id: 1
 *               title: "Runninghsj167"
 *               author: "Raymondjsj167"
 *               ISBN: 132456787999
 *               createdAt: "2023-08-24T11:52:56.198Z"
 *               updatedAt: "2023-08-24T11:52:56.198Z"
 */
router.get("/", listBooks);

/**
 * @swagger
 * /addBook:
 *    post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *
 *       example:
 *           books:
 *             - id: 1
 *               title: "Runninghsj167"
 *               author: "Raymondjsj167"
 *               ISBN: 12345567899
 *               createdAt: "2023-08-24T11:52:56.198Z"
 *               updatedAt: "2023-08-24T11:52:56.198Z"
 */
router.post("/addBook", addBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *    summary: Update the book by the id
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */
router.put("/books/:id", editBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */

router.delete("/books/:id", deleteBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Search books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of filtered books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 books:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *         example:
 *           currentPage: 1
 *           totalPages: 1
 *           totalItems: 1
 *           books:
 *             - id: 1
 *               title: "Runninghsj167"
 *               author: "Raymondjsj167"
 *               ISBN: "1dfg567hhs167"
 *               createdAt: "2023-08-24T11:52:56.198Z"
 *               updatedAt: "2023-08-24T11:52:56.198Z"
 */
router.get("/books", filterBooks);

export default router;
