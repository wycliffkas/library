import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./Table"; 
import { Book } from "../constants/types";

const mockTableData: Book[] = [
  {
    id: 1,
    ISBN: "1234567890",
    title: "Sample Book 1",
    author: "Author 1",
  },
  {
    id: 2,
    ISBN: "9876543210",
    title: "Sample Book 2",
    author: "Author 2",
  },
];

describe("Table Component", () => {
  it("renders table rows with data", () => {
    render(
      <Table
        tableData={mockTableData}
        handleDelete={() => {}}
        handleEdit={() => {}}
      />
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(mockTableData.length + 1);

    mockTableData.forEach((book) => {
      expect(screen.getByText(book.ISBN)).toBeInTheDocument();
      expect(screen.getByText(book.title)).toBeInTheDocument();
      expect(screen.getByText(book.author)).toBeInTheDocument();
    });
  });

  it("Calls handleEdit and handleDelete when icons are clicked", () => {
    const handleEditMock = jest.fn();
    const handleDeleteMock = jest.fn();

    render(
      <Table
        tableData={mockTableData}
        handleDelete={handleDeleteMock}
        handleEdit={handleEditMock}
      />
    );

    fireEvent.click(screen.getAllByTestId("edit-icon")[0]);
    expect(handleEditMock).toHaveBeenCalledWith(mockTableData[0]);

    fireEvent.click(screen.getAllByTestId("delete-icon")[1]);
    expect(handleDeleteMock).toHaveBeenCalledWith(
      mockTableData[1].id,
      mockTableData[1].title
    );
  });
});
