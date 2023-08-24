export interface Book {
	id: number;
	title: string;
	author: string;
	ISBN: string;
}

export interface BooksResponse {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	books: Book[];
}

export interface NewBook {
  title?: string;
	author?: string;
	ISBN?: string;
}

export const filterOptions = [
  { value: "title", label: "Title" },
  { value: "ISBN", label: "ISBN" },
  { value: "author", label: "Author" },
];
