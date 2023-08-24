import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormModal from "./FormModal";
import { Book, NewBook } from "../constants/types";

describe("FormModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  const mockFormData: Book = {
    id: 1,
    ISBN: "1234567890",
    title: "Sample Book",
    author: "Author",
  };

  it("renders correctly when adding a book", () => {
    render(
      <FormModal
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        isEditing={false}
        formData={null}
      />
    );

    expect(screen.getByText("Add Book")).toBeInTheDocument();
    expect(screen.getByLabelText("ISBN")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Author")).toBeInTheDocument();
  });

  it("renders correctly when editing a book", () => {
    render(
      <FormModal
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        isEditing={true}
        formData={mockFormData}
      />
    );

    expect(screen.getByText("Edit Book")).toBeInTheDocument();
    expect(screen.getByLabelText("ISBN")).toHaveDisplayValue(mockFormData.ISBN);
    expect(screen.getByLabelText("Title")).toHaveDisplayValue(mockFormData.title);
    expect(screen.getByLabelText("Author")).toHaveDisplayValue(mockFormData.author);
  });

  it("calls onSubmit and onClose when 'Add' or 'Edit' button is clicked", () => {
    const mockBook: NewBook = {
      ISBN: "9876543210",
      title: "New Book",
      author: "New Author",
    };

    render(
      <FormModal
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        isEditing={false}
        formData={null}
      />
    );

    fireEvent.change(screen.getByLabelText("ISBN"), {
      target: { value: mockBook.ISBN },
    });
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: mockBook.title },
    });
    fireEvent.change(screen.getByLabelText("Author"), {
      target: { value: mockBook.author },
    });

    fireEvent.click(screen.getByText("Add"));
    expect(mockOnSubmit).toHaveBeenCalledWith(mockBook);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("Calls onClose when 'Cancel' button is clicked", () => {
    render(
      <FormModal
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        isEditing={false}
        formData={null}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
