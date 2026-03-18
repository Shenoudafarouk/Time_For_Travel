const assert = require('assert');
const path = require('path');

const modulePath = path.join(__dirname, '..', 'config', 'mongoUrl');

describe('mongoUrl config', function () {
    const originalMongoUri = process.env.MONGO_URI;
    const originalMongoDbUri = process.env.MONGODB_URI;
    const originalMongoLabUri = process.env.MONGOLAB_URI;

    afterEach(function () {
        process.env.MONGO_URI = originalMongoUri;
        process.env.MONGODB_URI = originalMongoDbUri;
        process.env.MONGOLAB_URI = originalMongoLabUri;
        delete require.cache[require.resolve(modulePath)];
    });

    function loadModule() {
        delete require.cache[require.resolve(modulePath)];
        // eslint-disable-next-line global-require
        return require(modulePath);
    }

    it('prefers MONGO_URI environment variable', function () {
        process.env.MONGO_URI = 'mongodb://example:27017/test-env';
        process.env.MONGODB_URI = '';
        process.env.MONGOLAB_URI = '';
        const { getMongoUri } = loadModule();
        assert.strictEqual(getMongoUri(), 'mongodb://example:27017/test-env');
    });

    it('falls back to default when env vars are not set', function () {
        process.env.MONGO_URI = '';
        process.env.MONGODB_URI = '';
        process.env.MONGOLAB_URI = '';
        const { getMongoUri, DEFAULT_MONGO_URI } = loadModule();
        assert.strictEqual(getMongoUri(), DEFAULT_MONGO_URI);
    });
});
