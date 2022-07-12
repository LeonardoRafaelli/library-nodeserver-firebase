const { save, get, getById, remove } = require("../../crud/index");

const getAuthors_Books = async () => {
  const customers = await get("author_has_book");
  return customers;
};

const getAuthorBooksByAuthorId = async (_id) => {
  const allAuthors = await get("author_has_book");

  const author = allAuthors.map((author) => {
      if (author.author_id === _id) {
        return author.book_id;
      }
    }).filter((author) => author !== undefined);

  return author;
};

const getBookAuthorsByBookId = async (_id) => {
  const allBooks = await get("author_has_book");

  const bookAuthors = allBooks.map((book) => {
    if (book.book_id === _id) {
      return book.author_id;
    }
  }).filter((book) => book !== undefined);

  return bookAuthors;
};

const updateAuthorHasBook = async (_id, AuthorHasBook) => {
  const updatedAuthorHasBook = await save(
    "author_has_book",
    _id,
    AuthorHasBook
  );
  return updatedAuthorHasBook;
};

const saveAuthorHasBook = async (AuthorHasBook) => {
  const savedAuthorHasBook = await save("author_has_book", null, AuthorHasBook);
  return savedAuthorHasBook;
};

const removeAuthorHasBook = async (_id) => {
  const deletedAuthorHasBook = remove("author_has_book", _id);
  return deletedAuthorHasBook;
};

module.exports = {
  getAuthors_Books,
  getAuthorBooksByAuthorId,
  getBookAuthorsByBookId,
  updateAuthorHasBook,
  saveAuthorHasBook,
  removeAuthorHasBook,
};
