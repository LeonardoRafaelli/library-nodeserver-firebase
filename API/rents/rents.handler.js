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
    let bookAvailable;
    let booksNotAvailable = [];

    //For in the try rent books array
    for (let i = 0; i < rent.booksId.lenght; i++) {
        //Getting books and return rent_id, if exists
        bookAvailable = await booksHandler.getBooks().then((books) => {
            const book = books.find((book) => book.id === rent.booksId[i]);
            return book.rent_id;
        })
        
        //if rent_id existis, it's gonna push to an array of not available books
        if (bookAvailable != undefined) {
            booksNotAvailable.push(rent.booksId[i]);
        };
    }

    //if there is some book not available among all requested books
    if(booksNotAvailable.length > 0) return booksNotAvailable;
    return bookAvailable;
}

const saveRent = async (rent) => {
    //receiving undefined, or an arr of books id
    const checkedBooksAvailability = await checkBooksAvailability(rent);

    //verifying if the customer id already have a pendent rent
    if ((await getRents()).some(e => e.customer_id == rent.customer_id)) {
        return { error: "Customer already have books rented. Please, remove his current rents before rent other books" }

    } else {

        if (checkedBooksAvailability === undefined) {
            //if everything is right, it's gonna register a new rent
            const savedRent = save("rents", null, rent);
            //loop bookId of the requested books
            for(rentBookId of rent.booksId){
                //getting all books
                const books = await booksHandler.getBooks();
                //loop in the books
                for(bookData of books){
                    // adding rent_id in the rented books;
                    if(bookData.id == rentBookId){
                        await booksHandler.updateBook(rentBookId, { ...bookData, rent_id: savedRent.id })
                    }
                }
            }
            return savedRent;

        } else {
            return { booksNotAvailableToRent: checkedBooksAvailability };
        };
    }
}


const removeRentByCustomerId = async (_id) => {
    const rents = await get("rents");
    const customerRent = rents.find((rent) => rent.customer_id === _id);
    
    //Removing rent_id from the books
    const booksRented = await booksHandler.getBooks("books");
    for(book of booksRented){

    }
                for(bookData of books){
                
                    if(bookData.id == rentBookId){
                        delete bookData.rent_id;
                        await booksHandler.updateBook(rentBookId, {...bookData})
                    }
            }
            


    const removedRent = remove("rents", customerRent.id);
    
    return removedRent;
}

module.exports = {
    getRents,
    getRentByCustomerId,
    saveRent,
    removeRentByCustomerId
}