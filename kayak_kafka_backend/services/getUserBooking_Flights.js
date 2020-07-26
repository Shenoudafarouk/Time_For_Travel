let mysql = require('../mysql/mysql');
//var mongo = require('../mongo/mongo.js');
const MongoClient = require('mongodb').MongoClient;
var mongoURL = 'mongodb+srv://shenouda:P9NWCxGf1qomLuBA@cluster0-nstjf.mongodb.net/kayak?retryWrites=true&w=majority';
let async = require("async");
let ObjectID = require("mongodb").ObjectID;
let db = null;
const dbName = 'kayak';
MongoClient.connect(mongoURL, function (err, db_actual) {
    db = db_actual.db(dbName);
})

handle_request = ((data, callback) => {
    console.log("*************************************Flights");
    let response = {
        status: 400
    };
    let username = data.username;
    let flightId = '';
    try {
        let getflightbookingsinfo = "select * from flightbooking where flightbooking.username = '" + data.username + "' ";

        mysql.fetchData(function (err, result) {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                if (result.length !== 0) {
                    let resultflights = [];

                    async.forEachOf(result, function (booking, index, cb) {
                        console.log(booking);
                        console.log("asdjklasdjlkasjflkasjflkj");
                        flightId = booking.flightId;
                        db.collection('flights').findOne({_id: new ObjectID(flightId)}, function (err, flightDetails) {
                            console.log(flightDetails);
                            console.log(err);
                            if (flightDetails) {
                                let flight_booking = {one: {}, two: {}}

                                flight_booking.two = booking;
                                flight_booking.one = flightDetails;
                                resultflights.push(flight_booking);
                                cb();
                                // console.log("******************in hotel final result");
                                // console.log(resulthotels)
                            }
                            else {
                                cb(err);
                                console.log("in error");

                            }
                        });

                        console.log("aaj")

                    }, function (err) {
                        if (err) {
                            callback(err)
                        } else {
                            console.log("flights -- ");

                            console.log(resultflights);
                            callback(null, resultflights);
                        }
                    });
                }else{
                    callback(null, result);
                }


            }
        }, getflightbookingsinfo);
    }

    catch (e) {
        console.log(e);
        callback(e, null)
    }
});

exports.handle_request = handle_request;
