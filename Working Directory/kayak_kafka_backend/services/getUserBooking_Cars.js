let mysql = require('../mysql/mysql');
var mongo =require('../mongo/mongo.js');
var mongoURL = "mongodb+srv://shenouda:P9NWCxGf1qomLuBA@cluster0-nstjf.mongodb.net/kayak?retryWrites=true&w=majority";


handle_request = ((data, callback) => {
    console.log("*************************************car");
    let response = {
        status: 400
    };
    let username=data.username;
    try {
        let getcarbookingsinfo = "select * from carbooking where carbooking.username = '" + data.username + "' ";

        mysql.fetchData(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result.length);
                if (result.length === 1) {
                    let mongoquery=result[0].carId;
                    console.log(mongoquery);
                    let resultcars=[];
                    resultcars.push(result);
                    mongo.connect(mongoURL, function(db){
                        console.log('Connected to mongo at: ' + mongoURL);
                        db.collection('cars').findOne({hostId:"123"}, function(err, user){
                            console.log(user);
                            if (user) {
                                resultcars.push(user);
                            }
                            else{
                                console.log("in error");

                            }
                            db.close();
                            callback(null,resultcars);
                        });
                    });

                }
            }
        },getcarbookingsinfo);
    }
    catch (e) {
        console.log(e);
        callback(e, null)
    }
});

exports.handle_request = handle_request;
