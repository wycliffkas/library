import { useState, useEffect, useCallback } from "react";
import {
	fetchBooks,
	searchBooks,
	addBook,
	editBook,
	deleteBook
} from "../services/api";
import { NewBook, BooksResponse } from "../constants/types";

export function useBooks() {
	const [data, setData] = useState<BooksResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		fetchBooksData(currentPage);
	}, [currentPage]);

	const fetchBooksData = async (pageNumber: number) => {
		try {
			setLoading(true);
			const fetchedData = await fetchBooks(pageNumber);
			setData(fetchedData);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
			setLoading(false);
		}
	};

	const searchBooksData = useCallback(
		async (query: string, pageNumber: number) => {
			try {
				const searchedData = await searchBooks(query, pageNumber);
				setData(searchedData);
			} catch (error) {
				console.error("Error searching data:", error);
			}
		},
		[]
	);

	const addEditBook = async (
		book: NewBook,
		isEditing: boolean,
		selectedBookId: number
	) => {
		try {
			if (isEditing) {
				await editBook(selectedBookId, book);
			} else {
				await addBook(book);
			}

			fetchBooksData(currentPage);
		} catch (error) {
			console.error("Error adding/editing book:", error);
		}
	};

	const deleteSelectedBook = async (bookId: number, bookTitle: string) => {
		try {
			const confirmed = window.confirm(
				`Are you sure you want to delete ${bookTitle}?`
			);
			if (confirmed) {
				await deleteBook(bookId);
			}
			await fetchBooksData(currentPage);
		} catch (error) {
			console.error("Error deleting book:", error);
		}
	};

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		pageNumber: number
	) => {
		setCurrentPage(pageNumber);
	};

	return {
		data,
		loading,
		fetchBooks: fetchBooksData,
		searchBooks: searchBooksData,
		addEditBook,
		deleteBook,
		deleteSelectedBook,
		handlePageChange
	};
}
