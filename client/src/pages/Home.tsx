import React, { useState } from "react";
import styled from "styled-components";
import "../App.css";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { NewBook, Book } from "../constants/types";
import FormModal from "../components/FormModal";
import SearchInput from "../components/SearchInput";
import Table from "../components/Table";
import Box from "@mui/material/Box";
import { useBooks } from "../hooks/useBooks";

const Container = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
	margin-bottom: 16px;
	justify-content: space-between;
`;

const StyledHeading = styled.h4`
	text-align: center;
`;

function Home() {
	const {
		data,
		loading,
		fetchBooks,
		searchBooks,
		addEditBook,
    deleteSelectedBook,
		handlePageChange
	} = useBooks();

	const [modalOpen, setModalOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [selectedBook, setSelectedBook] = useState<Book | null>(null);
	const [searchValue, setSearchValue] = useState("");

	const handleOpen = () => {
		setModalOpen(true);
	};

	const handleClose = () => {
		setModalOpen(false);
		setIsEditing(false);
		setSelectedBook(null);
	};

	const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSearchValue(value);

		if (value) {
			searchBooks(value, 1);
		} else {
			fetchBooks(1);
		}
	};

	const handleBookEdit = (book: Book) => {
		setSelectedBook(book);
		setModalOpen(true);
		setIsEditing(true);
	};

	const handleAddEditBook = (book: NewBook) => {
		const selectedBookId = selectedBook?.id!;
		addEditBook(book, isEditing, selectedBookId);
	};

	if (loading) {
		return <div>Loading books...</div>;
	}

	return (
		<div className="App">
			<StyledHeading>Library</StyledHeading>
			<Container>
				<Button variant="outlined" onClick={handleOpen}>
					Add Book
				</Button>
				{!!data?.books?.length && (
					<SearchInput value={searchValue} onChange={handleSearch} />
				)}
			</Container>
			<FormModal
				open={modalOpen}
				onClose={handleClose}
				onSubmit={handleAddEditBook}
				isEditing={isEditing}
				formData={selectedBook}
			/>
			{!!data?.books?.length ? (
				<Table
					tableData={data?.books}
					handleDelete={deleteSelectedBook}
					handleEdit={handleBookEdit}
				/>
			) : (
				<StyledHeading>No books available.</StyledHeading>
			)}

			{!!data?.books?.length && (
				<Box mt={2}>
					<Pagination
						variant="outlined"
						shape="rounded"
						count={data?.totalPages}
						page={data?.currentPage}
						onChange={handlePageChange}
					/>
				</Box>
			)}
		</div>
	);
}

export default Home;
