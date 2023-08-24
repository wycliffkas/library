import React from "react";
import Table from "../components/Table";
import { Book } from "../constants/types";

export default {
	title: "Components/Table",
	component: Table
};

const tableData: Book[] = [
	{
		id: 1,
		ISBN: "978-3-16-148410-0",
		title: "The Lord of the Rings",
		author: "J.R.R. Tolkien"
	},
	{
		id: 2,
		ISBN: "978-0-7432-4722-1",
		title: "The Da Vinci Code",
		author: "Dan Brown"
	}
];

export const Default = () => (
	<Table
		tableData={tableData}
		handleDelete={() => {}}
		handleEdit={() => {}}
	/>
);
