import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "./SearchInput"; 

describe("SearchInput Component", () => {
  it("renders correctly", () => {
    const mockOnChange = jest.fn();

    render(<SearchInput value="" onChange={mockOnChange} />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("placeholder", "Search...");
  });

  it("calls onChange when input value changes", () => {
    const mockOnChange = jest.fn();

    render(<SearchInput value="" onChange={mockOnChange} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "sample search" },
    });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("renders with the provided value", () => {
    const mockOnChange = jest.fn();

    render(<SearchInput value="sample value" onChange={mockOnChange} />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue("sample value");
  });

  it("focuses on the input element", () => {
    const mockOnChange = jest.fn();

    render(<SearchInput value="" onChange={mockOnChange} />);

    const inputElement = screen.getByRole("textbox");
    expect(document.activeElement).toBe(inputElement);
  });
});
