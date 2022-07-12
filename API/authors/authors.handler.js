const {save, get, getById, remove} = require('../../crud/index');

const getAuthors = async () => {
    const authors = await get("authors");
    return authors;
};

const getAuthorById = async (_id) => {
    const author = await getById("authors", _id);
    return author;
}

const updateAuthor = async (_id, author) => {
    const updatedAuthor = await save("authors", _id, author);
    return updatedAuthor;
}

const saveAuthor = async (author) => {
    const savedAuthor = await save("authors", null, author);
    return savedAuthor;
}

const removeAuthor = async (_id) => {
    const deletedAuthor = remove('authors', _id);
    return deletedAuthor;
}

module.exports = {
    getAuthors,
    getAuthorById,
    updateAuthor,
    saveAuthor,
    removeAuthor
}