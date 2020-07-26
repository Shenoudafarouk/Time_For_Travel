//var mongo = require('../mongo/mongo.js');
const MongoClient = require('mongodb').MongoClient;
var mongoURL = 'mongodb+srv://shenouda:P9NWCxGf1qomLuBA@cluster0-nstjf.mongodb.net/kayak?retryWrites=true&w=majority';
var ObjectID = require('mongodb').ObjectID;

const dbName = 'kayak';
function getDetails(msg, callback) {
    var db;
    var res = {};
    console.log("In handle request:" + JSON.stringify(msg));

    MongoClient.connect(mongoURL, function (err, client) {

        console.log('Connected to mongo at: ' + mongoURL);
        const db = client.db(dbName);
        console.log(msg.id);

        db.collection('flights').findOne({_id: ObjectID(msg.id)}, function (err, flight) {
            console.log(flight);
            if (flight) {
                res.flight = flight;
                res.status = 200;
                res.message = "Flight details retrieval successful";
            }

            else {
                console.log("in error");
                res.code = 401;
                res.value = "Failed to fetch";
            }
            client.close();
            callback(null, res);
        });
    })
}

exports.getDetails = getDetails;