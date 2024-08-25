let mysql = require('../mysql/mysql');
var mongo =require('../mongo/mongo.js');
var mongoURL = 'mongodb+srv://shenouda:P9NWCxGf1qomLuBA@cluster0-nstjf.mongodb.net/kayak?retryWrites=true&w=majority';


handle_request = ((data, callback) => {
    console.log("*************************************Hotels");
    let response = {
        status: 400
    };
    let username=data.username;
    try {
        let gethotelbookingsinfo = "select * from hotelbooking where hotelbooking.username = '" + data.username + "' ";

        mysql.fetchData(function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                }
                else {
                    console.log(result.length);
                    console.log(result.rows);
                    if (result.length === 1) {
                        let mongoquery=result[0].hotelId;
                        console.log(mongoquery);
                        let resulthotels=[];
                        resulthotels.push(result);
                        mongo.connect(mongoURL, function(db){
                            console.log('Connected to mongo at: ' + mongoURL);
                            db.collection('hotels').findOne({hostId:"5"}, function(err, user){
                                console.log(user);
                                if (user) {
                                    resulthotels.push(user);
                                }
                                else{
                                    console.log("in error");

                                }
                                db.close();
                                callback(null,resulthotels);
                            });
                    });

                }
                }
            },gethotelbookingsinfo);
    }
 catch (e) {
    console.log(e);
    callback(e, null)
}
});

exports.handle_request = handle_request;
