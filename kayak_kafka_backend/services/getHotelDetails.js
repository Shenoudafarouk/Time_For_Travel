var mongo = require('../mongo/mongo.js');
var mongoURL = 'mongodb+srv://shenouda:P9NWCxGf1qomLuBA@cluster0-nstjf.mongodb.net/kayak?retryWrites=true&w=majority';
var ObjectID = require('mongodb').ObjectID;

function getDetails(msg, callback) {
    var db;
    var res = {};
    console.log("In handle request:" + JSON.stringify(msg));

    mongo.connect(mongoURL, function (db) {

        console.log('Connected to mongo at: ' + mongoURL);
        console.log(msg.id);

        db.collection('hotels').findOne({_id: ObjectID(msg.id)}, function (err, hotel) {
            console.log(hotel);
            if (hotel) {
                res.hotel = hotel;
                res.status = 200;
                res.message = "Hotel details retrieval successful";
            }

            else {
                console.log("in error");
                res.code = 401;
                res.value = "Failed to fetch";
            }
            db.close();
            callback(null, res);
        });
    })
}

exports.getDetails = getDetails;