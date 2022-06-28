// const booksController = require('./books.controller')
const {save, get, getById, remove} = require('../../crud/index');

const getBooks = async (req, res) => {
    const books = await get('books');
    return books;
};

const getBookById = async (req, res) => {
    const id = req.params.id;
    const book = await getById("books", id);
    return book;
}

const saveBook = async (req, res) => {
    const book = req.body;
    const savedBook = await save("books", null, book);
    return savedBook;
}

const removeBook = async (req, res) => {
    const id = req.params.id;
    const deletedBook = remove('books', id);
    return deletedBook;
}

module.exports = {
    getBooks,
    getBookById,
    saveBook,
    removeBook
}