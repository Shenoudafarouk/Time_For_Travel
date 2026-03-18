const DEFAULT_MONGO_URI = 'mongodb://127.0.0.1:27017/kayak';

function getMongoUri() {
    return process.env.MONGO_URI ||
        process.env.MONGODB_URI ||
        process.env.MONGOLAB_URI ||
        DEFAULT_MONGO_URI;
}

module.exports = {
    getMongoUri,
    DEFAULT_MONGO_URI
};
