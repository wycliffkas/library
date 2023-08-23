import { toast } from "react-toastify";
import { NewBook } from "../constants/types";

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function fetchBooks(page: number) {
	try {
		const response = await fetch(`${baseUrl}/?page=${page}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("Error", error);
	}
}

export async function searchBooks(query: string, pageNumber: number) {
	try {
		const response = await fetch(
			`${baseUrl}/books?q=${query}&page=${pageNumber}`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("Error", error);
	}
}

export async function addBook(book: NewBook) {
	try {
		const response = await fetch(`${baseUrl}/addBook`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(book)
		});

		if (response.ok) {
			toast.success("Book successfully Added!");
		} else {
			toast.warning("Error adding book");
		}
	} catch (error) {
		console.log("Error", error);
	}
}

export async function editBook(bookId: number, book: NewBook) {
	try {
		const response = await fetch(`${baseUrl}/books/${bookId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(book)
		});

		if (response.ok) {
			toast.success("Book successfully Edited!");
		}
	} catch (error) {
		toast.warning("Error editing book");
		console.log("Error", error);
	}
}

export async function deleteBook(bookId: number) {
	try {
		const response = await fetch(`${baseUrl}/books/${bookId}`, {
			method: "DELETE"
		});

		if (response.ok) {
			toast.success("Book successfully deleted!");
		}
	} catch (error) {
		toast.warning("Error deleting book");
		console.log("Error", error);
	}
}
