import { Request, Response } from "express";
import Book from "../models/Book";
import { Op } from "sequelize";
import { sequelize } from '../config/database';


interface FilterCriteria {
	title?: string;
	author?: string;
	ISBN?: string;
}

interface PaginationOptions {
  page: number;
  perPage: number;
}

export async function addBook(req: Request, res: Response) {
	try {
		const { title, author, ISBN } = req.body;

		const requiredFields = ["title", "author", "ISBN"];

		for (const field of requiredFields) {
			if (!req.body[field] || req.body[field].trim() === "") {
				return res.status(400).json({
					error: `Field '${field}' must have a non-empty value in the request body`
				});
			}
		}

		const newBook = await Book.create({ title, author, ISBN });

		return res
			.status(201)
			.json({ message: "Book added successfully", book: newBook });
	} catch (error) {
		console.error("Error adding book:", error);
		return res
			.status(500)
			.json({ error: "An error occurred while adding the book" });
	}
}

export async function listBooks(req: Request, res: Response) {
  try {
    const { page, perPage } = req.query as unknown as PaginationOptions;
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(perPage) || 10;

    const offset = (pageNumber - 1) * itemsPerPage;

    const totalCount = await Book.count();

    const books = await Book.findAll({
      limit: itemsPerPage,
      offset: offset,
    });

    return res.status(200).json({
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / itemsPerPage),
      totalItems: totalCount,
      books: books,
    });
  } catch (error) {
    console.error('Error listing books:', error);
    return res.status(500).json({ error: 'An error occurred while listing books' });
  }
}

export async function editBook(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, author, ISBN } = req.body;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (title) {
      book.title = title;
    }

    if (author) {
      book.author = author;
    }

    if (ISBN) {
      book.ISBN = ISBN;
    }

    await book.save();

    return res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    console.error("Error editing book:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while editing the book" });
  }
}


export async function deleteBook(req: Request, res: Response) {
	try {
		const { id } = req.params;

		const book = await Book.findByPk(id);

		if (!book) {
			return res.status(404).json({ error: "Book not found" });
		}

		await book.destroy();

		return res.status(200).json({ message: "Book deleted successfully" });
	} catch (error) {
		console.error("Error deleting book:", error);
		return res
			.status(500)
			.json({ error: "An error occurred while deleting the book" });
	}
}


export async function filterBooks(req: Request, res: Response) {
  try {
    const { title, author, ISBN } = req.query as FilterCriteria;

    const where: any = {};

    if (title) {
      where['title'] = sequelize.where(
        sequelize.fn('LOWER', sequelize.col('title')),
        'LIKE',
        `%${title.toLowerCase()}%`
      );
    }

    if (author) {
      where['author'] = sequelize.where(
        sequelize.fn('LOWER', sequelize.col('author')),
        'LIKE',
        `%${author.toLowerCase()}%`
      );
    }

    if (ISBN) {
      where['ISBN'] = sequelize.where(
        sequelize.fn('LOWER', sequelize.col('ISBN')),
        'LIKE',
        `%${ISBN.toLowerCase()}%`
      );
    }

    const filteredBooks = await Book.findAll({
      where,
    });

    return res.status(200).json(filteredBooks);
  } catch (error) {
    console.error('Error filtering books:', error);
    return res.status(500).json({ error: 'An error occurred while filtering books' });
  }
}
