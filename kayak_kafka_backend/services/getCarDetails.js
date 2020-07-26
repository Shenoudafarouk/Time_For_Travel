//var mongo = require('../mongo/mongo.js');
const MongoClient = require('mongodb').MongoClient;
var mongoURL = 'mongodb+srv://shenouda:P9NWCxGf1qomLuBA@cluster0-nstjf.mongodb.net/kayak?retryWrites=true&w=majority';
var ObjectID = require('mongodb').ObjectID;

const dbName = 'kayak';
function getDetails(msg, callback) {
    //var db;
    var res = {};
    console.log("In handle request:" + JSON.stringify(msg));

    MongoClient.connect(mongoURL, function (err, client) {

        console.log('Connected to mongo at: ' + mongoURL);
        const db = client.db(dbName);
        console.log(msg.id);

        db.collection('cars').findOne({_id: ObjectID(msg.id)}, function (err, car) {
            console.log(car);
            if (car) {
                res.car = car;
                res.status = 200;
                res.message = "Car details retrieval successful";
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