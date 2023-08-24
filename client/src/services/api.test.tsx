import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { toast } from "react-toastify";
import { fetchBooks, searchBooks, addBook, editBook, deleteBook } from "./api";

const server = setupServer();

jest.mock("react-toastify", () => ({
	toast: {
		success: jest.fn(),
		warning: jest.fn()
	}
}));

beforeAll(() => server.listen());
afterEach(() => {
	server.resetHandlers();
	jest.clearAllMocks();
});
afterAll(() => server.close());

describe("API Functions", () => {
	it("fetchBooks should fetch books data", async () => {
		server.use(
			rest.get(`${process.env.REACT_APP_BASE_URL}/`, (req, res, ctx) => {
				return res(ctx.json({ data: "mocked data" }));
			})
		);

		const data = await fetchBooks(1);
		expect(data).toEqual({ data: "mocked data" });
	});

	it("searchBooks should fetch search results", async () => {
		server.use(
			rest.get(`${process.env.REACT_APP_BASE_URL}/books`, (req, res, ctx) => {
				return res(ctx.json({ results: "search results" }));
			})
		);

		const data = await searchBooks("query", 1);
		expect(data).toEqual({ results: "search results" });
	});

	it("addBook should add a book", async () => {
		server.use(
			rest.post(
				`${process.env.REACT_APP_BASE_URL}/addBook`,
				(req, res, ctx) => {
					return res(ctx.status(200));
				}
			)
		);

		await addBook({ title: "New Book", ISBN: "123fg", author: "Wycliff" });
		expect(toast.success).toHaveBeenCalledWith("Book successfully Added!");
	});

	it("addBook should handle error on failure", async () => {
		server.use(
			rest.post(
				`${process.env.REACT_APP_BASE_URL}/addBook`,
				(req, res, ctx) => {
					return res(ctx.status(400));
				}
			)
		);

		await addBook({ title: "New Book", ISBN: "123fg", author: "Wycliff" });
		expect(toast.warning).toHaveBeenCalledWith("Error adding book");
	});

	it("editBook should edit a book", async () => {
		server.use(
			rest.put(
				`${process.env.REACT_APP_BASE_URL}/books/:bookId`,
				(req, res, ctx) => {
					return res(ctx.status(200));
				}
			)
		);

		await editBook(1, { title: "Edited Book" });
		expect(toast.success).toHaveBeenCalledWith("Book successfully Edited!");
	});

	it("deleteBook should delete a book", async () => {
		server.use(
			rest.delete(
				`${process.env.REACT_APP_BASE_URL}/books/:bookId`,
				(req, res, ctx) => {
					return res(ctx.status(200));
				}
			)
		);

		await deleteBook(1);
		expect(toast.success).toHaveBeenCalledWith("Book successfully deleted!");
	});
});
