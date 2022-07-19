const { save, get, getById, remove } = require('../../crud/index');

const booksHandler = require('../books/books.handler');

// {
//     id: "",
//     rental_date: "",
//     return_date: ""
//     customer_id: ""
// }

//Fetching rents
const getRents = async () => {
    const rents = await get("rents");
    return rents;
};

//Fetching rents by customer id
const getRentByCustomerId = async (_id) => {
    const rents = await get("rents");
    const customerRent = rents.find((rent) => rent.customer_id === _id);
    return customerRent;
}

//Checking if some book of the try rent is not available
const checkBooksAvailability = async (rent) => {
    let bookAvailable = undefined;
    let booksNotAvailable = [];

    const books = await booksHandler.getBooks();


    //For in the try rent books array
    for (let i = 0; i < rent.booksId.length; i++) {
        //Getting books and return rent_id, if exists
        for (e of books) {
            if (e.id === rent.booksId[i]) {
                bookAvailable = e.rent_id;
                break;
            }
        }

        //if rent_id exists, it's gonna push to an array of not available books
        if (bookAvailable != undefined) {
            booksNotAvailable.push(rent.booksId[i]);
        };
    }

    //if there is some book not available among all requested books
    if (booksNotAvailable.length > 0) return booksNotAvailable;
    return bookAvailable;
}

const saveRent = async (rent) => {
    //receiving undefined, or an arr of books id
    const checkedBooksAvailability = await checkBooksAvailability(rent);
    // console.log(checkedBooksAvailability);

    //verifying if the customer id already have a pendent rent
    if ((await getRents()).some(e => e.customer_id == rent.customer_id)) {
        return { error: "Customer already have books rented. Please, remove his current rents before rent other books" }

    } else {

        if (checkedBooksAvailability === undefined) {
            //if everything is right, it's gonna register a new rent
            const savedRent = await save("rents", null, rent);
            //loop bookId of the requested books
            for (rentBookId of rent.booksId) {
                //getting all books
                const books = await booksHandler.getBooks();
                //loop in the books
                for (bookData of books) {
                    // adding rent_id in the rented books;
                    if (bookData.id == rentBookId) {
                        delete bookData.id;
                        await booksHandler.updateBook(rentBookId, { ...bookData, rent_id: savedRent.id })
                    }
                }
            }

            return savedRent;

        } else {
            //if there is some non available book, its gonna return a list of these books;
            return { booksNotAvailableToRent: checkedBooksAvailability };
        };
    }
}


const removeRentByCustomerId = async (_id) => {
    const rents = await get("rents");
    //fetching the rent to be removed
    const removingRent = rents.find((rent) => rent.customer_id === _id);

    if (removingRent === undefined) return { "Error": "Customer_id not found" }

    const booksRented = await booksHandler.getBooks("books");
    
    
    //Removing rent_id from the books
    //loop through all books
    for (bookData of booksRented) {
        //the book that has a rent_id that matches with the removing rent_id, its gonna have its property removed
        if (bookData.rent_id === removingRent.id) {
            const bookId = bookData.id;
            //Deleting to be able to rent the book again
            delete bookData.rent_id;
            //Deleting to not repeat when updating book
            delete bookData.id;
            await booksHandler.updateBook(bookId, { ...bookData })
        }
    }
    
    const removedRent = remove("rents", removingRent.id);

    return removedRent;
}

module.exports = {
    getRents,
    getRentByCustomerId,
    saveRent,
    removeRentByCustomerId
}