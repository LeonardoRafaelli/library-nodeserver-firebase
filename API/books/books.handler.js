const {save, get, getById, remove} = require('../../crud/index');

const getBooks = async () => {
    const books = await get("books");
    return books;
};

const getBookById = async (_id) => {
    const book = await getById("books", _id);
    return book;
}

const updateBook = async (_id, book) => {
    const updatedBook = await save("books", _id, book);
    return updatedBook;
}

const saveBook = async (book) => {
    const savedBook = await save("books", null, book);
    return savedBook;
}

const removeBook = async (_id) => {
    const deletedBook = remove('books', _id);
    return deletedBook;
}

module.exports = {
    getBooks,
    getBookById,
    saveBook,
    removeBook,
    updateBook
}