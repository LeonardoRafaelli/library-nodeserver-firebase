const {save, get, getById, remove} = require('../../crud/index');

const authorHasBooks = require('../author_has_book/author_has_book.handler');

const getBooks = async () => {
    const books = await get("books");
    return books;
};

const getRentedBooks = async() => {
    const books = await get('books');
    const rentedBooks = books.filter(e => e.rent_id);
    return rentedBooks;
}

const getBookById = async (_id) => {
    const book = await getById("books", _id);
    return book;
}

const updateBook = async (_id, book) => {
    const updatedBook = await save("books", _id, book);
    return updatedBook;
}

const saveBook = async (book) => {
    const authors = book.authors;
    if(!authors) return {erro: "The book has to have an author"}
    delete book.authors;
    const savedBook = await save("books", null, book);
    for(let author of authors){
        await authorHasBooks.saveAuthorHasBook({book_id: savedBook.id, author_id: author})
    }
    return savedBook;
}

const removeBook = async (_id) => {
    const authorsBooks = await authorHasBooks.getAuthors_Books();
    for(let authBooks of authorsBooks){
        if(authBooks.book_id === _id){
            authorHasBooks.removeAuthorHasBook(authBooks.id);
        }
    }
    const deletedBook = remove('books', _id);
    return deletedBook;
}

module.exports = {
    getBooks,
    getBookById,
    getRentedBooks,
    saveBook,
    removeBook,
    updateBook
}