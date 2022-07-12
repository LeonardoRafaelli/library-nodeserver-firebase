const {save, get, getById, remove} = require('../../crud/index');

const getCustomers = async () => {
    const customers = await get('customers');
    return customers;
};

const getCustomerById = async (_id) => {
    const customer = await getById('customers', _id);
    return customer;
}

const updateCustomer = async (_id, customer) => {
    const updatedCustomer = await save('customers', _id, customer);
    return updatedCustomer;
}

const saveCustomer = async (customer) => {
    const savedCustomer = await save('customers', null, customer);
    return savedCustomer;
}

const removeCustomer = async (_id) => {
    const deletedCustomer = remove('customers', _id);
    return deletedCustomer;
}

module.exports = {
    getCustomers,
    getCustomerById,
    updateCustomer,
    saveCustomer,
    removeCustomer
}