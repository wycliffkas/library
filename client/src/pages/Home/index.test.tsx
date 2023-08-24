import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./index";
import * as useBooksModule from "../../hooks/useBooks";

jest.mock("../../hooks/useBooks");

describe("Home Component", () => {
	it("renders 'No books available.' when there are no books", () => {
		const mockUseBooks = jest.spyOn(useBooksModule, "useBooks");
		mockUseBooks.mockReturnValue({
			data: {
				books: [],
				totalPages: 0,
				currentPage: 1,
				totalItems: 0
			},
			loading: false,
			fetchBooks: jest.fn(),
			searchBooks: jest.fn(),
			addEditBook: jest.fn(),
			deleteBook: jest.fn(),
			deleteSelectedBook: jest.fn(),
			handlePageChange: jest.fn()
		});

		render(<Home />);
		const noBooksText = screen.getByText("No books available.");
		expect(noBooksText).toBeInTheDocument();
	});

	it("renders 'Loading books...' during loading state", () => {
		const mockUseBooks = jest.spyOn(useBooksModule, "useBooks");
		mockUseBooks.mockReturnValue({
			data: {
				books: [],
				totalPages: 0,
				currentPage: 1,
				totalItems: 0
			},
			loading: true,
			fetchBooks: jest.fn(),
			searchBooks: jest.fn(),
			addEditBook: jest.fn(),
			deleteBook: jest.fn(),
			deleteSelectedBook: jest.fn(),
			handlePageChange: jest.fn()
		});

		render(<Home />);

		const loadingText = screen.getByText("Loading books...");
		expect(loadingText).toBeInTheDocument();
	});
});
