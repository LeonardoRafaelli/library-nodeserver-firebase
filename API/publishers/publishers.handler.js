const {save, get, getById, remove} = require('../../crud/index');

const getPublishers = async () => {
    const publishers = await get('publishers');
    return publishers;
};

const getPublisherById = async (_id) => {
    const publisher = await getById('publishers', _id);
    return publisher;
}

const updatePublisher = async (_id, publisher) => {
    const updatedPublisher = await save('publishers', _id, publisher);
    return updatedPublisher;
}

const savePublisher = async (publisher) => {
    const savedPublisher = await save('publishers', null, publisher);
    return savedPublisher;
}

const removePublisher = async (_id) => {
    const deletedPublisher = remove('publishers', _id);
    return deletedPublisher;
}

module.exports = {
    getPublishers,
    getPublisherById,
    updatePublisher,
    savePublisher,
    removePublisher
}