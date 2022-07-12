const {save, get, getById, remove} = require('../../crud/index');

const booksHandler = require('../books/books.handler');


const getRents = async () => {
    const rents = await get("rents");
    return rents;
};

const getRentByCustomerId = async (_id) => {
    const rents = await get("rents");
    const customerRent = rents.filter((rent) => rent.customer_id === _id);
    return customerRent;
}


const checkBooksAvailability = async (rent) => {
    let bookAvailable;
    for(let i = 0; i < rent.booksId.lenght; i++){
        bookAvailable = booksHandler.getBooks().then((books) => {
            const book = books.find((book) => book.id === rent.booksId[i]);
            return book.rent_id ? false : true;
        })

        if(bookAvailable == false) break;
    }
    return bookAvailable;
}

const saveRent = async (rent) => {
    if((await getRents()).some(e => e.customer_id == rent.customer_id)){
        return {error: "Customer already have books rented. Please, remove his current rents before rent other books"}
    } else {
        if(await checkBooksAvailability(rent)){
            const savedRent = save("rents", null, rent);
            booksHandler.updateBook(book.id, {...book, rent_id: savedRent.id})
            return savedRent;
        } else {
            return {error: "Some book on the rent list is already rented"};
        };
    }
}

const removeRentByCustomerId = async (_id) => {
    const rents = await get("rents");
    const customerRent = rents.filter((rent) => rent.customer_id === _id);
    const customerRentId = customerRent.map((rent) => rent.id);
    const deletedRents = customerRentId.map((id) => remove('rents', id));
    return deletedRents;
}

module.exports = {
    getRents,
    getRentByCustomerId,
    saveRent,
    removeRentByCustomerId
}