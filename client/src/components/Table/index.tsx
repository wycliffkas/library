import React from "react";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Book } from "../../constants/types";
import {StyledTableCell, StyledTableRow } from './styles';

interface TableProps {
	tableData: Book[];
	handleDelete: (bookId: number, bookTitle: string) => void;
	handleEdit: (book: Book) => void;
}

const Table: React.FC<TableProps> = ({
	tableData,
	handleDelete,
	handleEdit
}) => {
	return (
		<MuiTable aria-label="customized table">
			<TableHead>
				<TableRow>
					<StyledTableCell>ISBN</StyledTableCell>
					<StyledTableCell>Title</StyledTableCell>
					<StyledTableCell>Author</StyledTableCell>
					<StyledTableCell>Action</StyledTableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{tableData.map((book) => (
					<StyledTableRow key={book.id}>
						<StyledTableCell component="th" scope="row">
							{book.ISBN}
						</StyledTableCell>
						<StyledTableCell align="left">{book.title}</StyledTableCell>
						<StyledTableCell align="left">{book.author}</StyledTableCell>
						<StyledTableCell align="left">
							<EditIcon
								fontSize="small"
								onClick={() => handleEdit(book)}
								data-testid="edit-icon"
							/>
							<DeleteIcon
								fontSize="small"
								onClick={() => handleDelete(book.id, book.title)}
								data-testid="delete-icon"
							/>
						</StyledTableCell>
					</StyledTableRow>
				))}
			</TableBody>
		</MuiTable>
	);
};

export default Table;
