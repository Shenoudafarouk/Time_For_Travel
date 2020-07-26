
//var mongo = require('../mongo/mongo.js');
const MongoClient = require('mongodb').MongoClient;
var mongoURL = 'mongodb+srv://shenouda:P9NWCxGf1qomLuBA@cluster0-nstjf.mongodb.net/kayak?retryWrites=true&w=majority';
const dbName = 'kayak';
function handle_request(msg, callback) {
    //var db;
    var res = {};
    console.log("In handle request:" + JSON.stringify(msg));


    /*  mongo.connect(mongoURL, function(){
          console.log('Connected to mongo at: ' + mongoURL);
          var coll = mongo.collection('login');

          coll.findOne({username: username, password:password}, function(err, user){
      */


     MongoClient.connect(mongoURL, function (err , client) {
        console.log('Connected to mongo at: ' + mongoURL);
        const db = client.db(dbName);
        // var coll = mongo.collection('login');
        console.log(msg.id);
        //coll.findOne({username: msg.username, password:msg.password}, function(err, user){
        //  console.log(user);
        //if (user) {

        db.collection('hotels').findOne({ hostId: "12" }, function (err, user) {
            console.log(user);
            if (user) {
                res.user = user;
                res.code = "200";
                res.value = "Success Login";

            }
            //console.log("rwe");
            //done(null,     {username: username, firstname:firstname, lastname:lastname});


            else {
                console.log("in error");
                res.code = "401";
                res.value = "Failed Login";
            }
            client.close();
            callback(null, res);
        });
    })

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
    res.code = "200";
    res.value = "Success Login";


    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }*/
    //  callback(null,res);
}

exports.handle_request = handle_request;