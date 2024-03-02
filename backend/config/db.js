// Importing necessary configurations for the database
let config = require('./config');

// Importing mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// Export a function that, when called, will attempt to connect to MongoDB and return a promise.
module.exports = function () {
    // Return a new promise object.
    return new Promise((resolve, reject) => {
        // Connect to MongoDB
        mongoose.connect(config.ATLASDB, { useNewUrlParser: true, useUnifiedTopology: true });

        // Get the default connection object.
        let mongodb = mongoose.connection;

        // Log any connection errors to the console.
        mongodb.on('error', (err) => {
            console.error('Connection Error: ', err);
            reject(err);
        });

        // Once the connection has been established, log a message to the console.
        mongodb.once('open', () => {
            console.log("====> Connected to MongoDB.");
            resolve(mongodb);
        });
    });
};