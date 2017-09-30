'use strict';
var DatabaseFactory = function (dbConfig) {
    var mongoose = require ('mongoose');

    var dbUrl = "mongodb"+"://"+dbConfig.connection.host+"/"+dbConfig.connection.database;
    var options = { useMongoClient : true };

    mongoose.connect(dbUrl,options);

    mongoose.connection.once('connected', function() {
        console.log("Connected to database")
    });

    mongoose.connection.on('error',function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('close', function () {
        console.log('Mongoose default connection disconnected');
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    return mongoose;
};

module.exports = DatabaseFactory;