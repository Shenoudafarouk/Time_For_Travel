let mysql = require('../mysql/mysql');
var mongo =require('../mongo/mongo.js');
var mongoURL = "mongodb+srv://shenouda:P9NWCxGf1qomLuBA@cluster0-nstjf.mongodb.net/kayak?retryWrites=true&w=majority";


handle_request = ((data, callback) => {
    console.log("*************************************flights");
    let response = {
        status: 400
    };
    let username=data.username;
    try {
        let getflightbookingsinfo = "select * from flightbooking where flightbooking.username = '" + data.username + "' ";

        mysql.fetchData(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result.length);
                console.log(result.rows);
                if (result.length === 1) {
                    let mongoquery=result[0].flightId;
                    console.log(mongoquery);
                    let resultflights=[];
                    resultflights.push(result);
                    mongo.connect(mongoURL, function(db){
                        console.log('Connected to mongo at: ' + mongoURL);
                        db.collection('flights').findOne({flightNo:"123"}, function(err, user){
                            console.log(user);
                            if (user) {
                                resultflights.push(user);
                            }
                            else{
                                console.log("in error");

                            }
                            db.close();
                            callback(null,resultflights);
                        });
                    });

                }
            }
        },getflightbookingsinfo);
    }
    catch (e) {
        console.log(e);
        callback(e, null)
    }
});

exports.handle_request = handle_request;
