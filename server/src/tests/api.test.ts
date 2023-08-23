import request from "supertest";
import http from "http";
import { app, server } from "../index";
import { sequelize } from "../config/database";
import Book from "../models/Book";

describe("Book Controller", () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true });
	});

	afterAll(async () => {
		await sequelize.close();
		await server.close();
	});

	it("should add a new book", async () => {
		const response = await request(app)
			.post("/addBook")
			.send({ title: "Test Book", author: "Test Author", ISBN: "1234567890" });

		expect(response.status).toBe(201);
		expect(response.body.message).toBe("Book added successfully");
		expect(response.body.book).toBeDefined();
	});

	it("should return a 500 status code when an error is encountred when adding a book", async () => {
		const mockCreate = jest.spyOn(Book, "create");
		mockCreate.mockRejectedValue(new Error("Mocked error"));

		const response = await request(app)
			.post("/addBook")
			.send({ title: "Test Book", author: "Test Author", ISBN: "1234567890" });

		expect(response.status).toBe(500);
		expect(response.body.error).toBe("An error occurred while adding the book");
	});

	it("should list books with pagination", async () => {
		const response = await request(app).get("/").query({
			page: 1,
			perPage: 10
		});

		expect(response.status).toBe(200);
		expect(response.body.currentPage).toBe(1);
		expect(response.body.totalPages).toBeGreaterThan(0);
		expect(response.body.totalItems).toBeGreaterThan(0);
		expect(Array.isArray(response.body.books)).toBe(true);
	});

	it("should edit a book", async () => {
		const response = await request(app)
			.put("/books/1")
			.send({ title: "Updated Book Title" });

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Book updated successfully");
		expect(response.body.book).toBeDefined();
	});

	it("should return a 500 status code and error message on internal error", async () => {
		const mockFindByPk = jest.spyOn(Book, "findByPk");
		const mockSave = jest.spyOn(Book.prototype, "save");
		const mockBook = new Book();
		mockBook.title = "Test Book";
		mockBook.author = "Test Author";
		mockBook.ISBN = "1234567890";

		mockFindByPk.mockResolvedValue(mockBook);

		mockSave.mockRejectedValue(new Error("Mocked error"));

		const response = await request(app)
			.put("/books/1")
			.send({ title: "Updated Book Title" });

		expect(response.status).toBe(500);
		expect(response.body.error).toBe(
			"An error occurred while editing the book"
		);
	});

	it("should respond with a 404 status code for a non-existing route", async () => {
		const response = await request(app).get("/non-existing-route");
		expect(response.status).toBe(404);
	});

	it("should delete a book", async () => {
		const response = await request(app).delete("/books/1");

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Book deleted successfully");
	});

	it("should return a 500 status code and error message on internal error", async () => {
		const mockFindByPk = jest.spyOn(Book, "findByPk");
		const mockDestroy = jest.spyOn(Book.prototype, "destroy");

		const mockBook = new Book();

		mockFindByPk.mockResolvedValue(mockBook);

		mockDestroy.mockRejectedValue(new Error("Mocked error"));

		const response = await request(app).delete("/books/1");

		expect(response.status).toBe(500);
		expect(response.body.error).toBe(
			"An error occurred while deleting the book"
		);
	});

	it("should respond with filtered books and pagination details", async () => {
		const response = await request(app)
			.get("/books")
			.query({ q: "keyword", page: 2, perPage: 5 });

		expect(response.status).toBe(200);
		expect(response.body.currentPage).toBe(2);
		expect(response.body.totalPages).toBeGreaterThanOrEqual(0);
		expect(response.body.totalItems).toBeGreaterThanOrEqual(0);
		expect(Array.isArray(response.body.books)).toBe(true);
	});
});
