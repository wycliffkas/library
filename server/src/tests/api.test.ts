import request from 'supertest';
import http from 'http';
import { app, server } from '../index';
import { sequelize } from '../config/database';

describe('Book Controller', () => {

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
    await server.close();
  });

  it('should add a new book', async () => {
    const response = await request(app)
      .post('/addBook')
      .send({ title: 'Test Book', author: 'Test Author', ISBN: '1234567890' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Book added successfully');
    expect(response.body.book).toBeDefined();
  });

  it('should list books with pagination', async () => {
    const response = await request(app).get('/').query({
      page: 1,
      perPage: 10,
    });

    expect(response.status).toBe(200);
    expect(response.body.currentPage).toBe(1);
    expect(response.body.totalPages).toBeGreaterThan(0);
    expect(response.body.totalItems).toBeGreaterThan(0);
    expect(Array.isArray(response.body.books)).toBe(true);
  });

  it('should edit a book', async () => {
    const response = await request(app)
      .put('/books/edit/1')
      .send({ title: 'Updated Book Title' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Book updated successfully');
    expect(response.body.book).toBeDefined();
  });

  it('should delete a book', async () => {
    const response = await request(app).delete('/books/delete/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Book deleted successfully');
  });

  it('should filter books by title', async () => {
    const response = await request(app).get('/books/filter').query({
      title: 'test',
    });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

});
