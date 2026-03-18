let mongoose = require('mongoose');
let gracefulShutdown;
const { getMongoUri } = require('./mongoUrl');
const dbURI = getMongoUri();

function redactMongoUri(uri) {
    if (!uri) return 'undefined';
    if (!uri.includes('@')) return uri;
    const [protocol, withoutProtocol] = uri.split('://');
    if (!withoutProtocol) return 'undefined';
    const afterAt = withoutProtocol.split('@').pop();
    return `${protocol}://<credentials>@${afterAt}`;
}

const redactedDbURI = redactMongoUri(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + redactedDbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

async function connectMongoose() {
    try {
        await mongoose.connect(dbURI, { maxPoolSize: 10, minPoolSize: 0 });
    } catch (err) {
        console.error(`Mongoose initial connection error for ${redactedDbURI}: ${err && err.message ? err.message : err}`);
        if (err && err.stack) {
            console.error(err.stack);
        }
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
        console.warn('Continuing without an active MongoDB connection; functionality may be degraded.');
    }
}

connectMongoose();

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app termination', function () {
        process.exit(0);
    });
});
