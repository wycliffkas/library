import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { NewBook, Book } from "../../constants/types";

export interface FormModalProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (book: NewBook) => void;
	isEditing: boolean;
	formData: Book | null;
}

const FormModal: React.FC<FormModalProps> = ({
	open,
	onClose,
	onSubmit,
	isEditing,
	formData
}) => {
	const [book, setBook] = useState({
		ISBN: "",
		title: "",
		author: ""
	});

	useEffect(() => {
		if (isEditing && formData) {
			setBook(formData);
		}
	}, [isEditing, formData]);

	const handleSubmit = () => {
		if (
			book.ISBN.trim() === "" ||
			book.title.trim() === "" ||
			book.author.trim() === ""
		) {
			return;
		} else {
			onSubmit(book);
			setBook({
				ISBN: "",
				title: "",
				author: ""
			});
			onClose();
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setBook((prevData) => ({
			...prevData,
			[name]: value
		}));
	};

	const handleClose = () => {
		setBook({
			ISBN: "",
			title: "",
			author: ""
		});
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{isEditing ? "Edit" : "Add"} Book</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					name="ISBN"
					label="ISBN"
					type="text"
					fullWidth
					variant="standard"
					onChange={handleChange}
					value={book.ISBN}
				/>

				<TextField
					autoFocus
					margin="dense"
					name="title"
					label="Title"
					type="text"
					fullWidth
					variant="standard"
					onChange={handleChange}
					value={book.title}
				/>

				<TextField
					autoFocus
					margin="dense"
					name="author"
					label="Author"
					type="text"
					fullWidth
					variant="standard"
					onChange={handleChange}
					value={book.author}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant="outlined">
					Cancel
				</Button>
				<Button onClick={handleSubmit} variant="contained">
					{isEditing ? "Edit" : "Add"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default FormModal;
