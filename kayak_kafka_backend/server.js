let connection = new require('./kafka/Connection');
let req_topics = require('./config/topic_enum').req_topic_names;

require('./config/mongooseConfig');

let producer = connection.getProducer();
let login = require('./services/login');
let signup = require('./services/signup');
let hotel_listing = require('./services/listing/hotelListing');
let flight_listing = require('./services/listing/flightListing');
let car_listing = require('./services/listing/carListing');

let addflight = require('./services/admin/addFlight');
let addhotel = require('./services/admin/addHotel');
let fetchhotels = require('./services/admin/fetchHotels');
let modifyRooms = require('./services/admin/modifyRooms');
let fetchflights = require('./services/admin/fetchFlights');
let modifyHotel = require('./services/admin/modifyHotel');
let modifyFlight = require('./services/admin/modifyFlight');
let modifyFlightClass = require('./services/admin/modifyFlightClass');
let addCar = require('./services/admin/addCar');
let fetchCars = require('./services/admin/fetchCars');
let modifyCar = require('./services/admin/modifyCar');
let addHost = require('./services/admin/addHost');
let fetchHosts = require('./services/admin/fetchHosts');
let modifyHost = require('./services/admin/modifyHost');
let fetchUsers = require('./services/admin/user/fetchUsers');
let modifyUser = require('./services/admin/user/modifyUser');
let fetchHotelBookings = require('./services/admin/bookings/fetchHotelBookings');
let fetchCarBookings = require('./services/admin/bookings/fetchCarBookings');
let fetchFlightBookings = require('./services/admin/bookings/fetchFlightBookings');

//
let getFlightDetails = require('./services/getFlightDetails');
let getHotelDetails = require('./services/getHotelDetails');
let getCarDetails = require('./services/getCarDetails');
let getUserDetails = require('./services/getUserDetails');
let bookFlight = require('./services/bookFlight');
let bookHotel = require('./services/bookHotel');
let bookCar = require('./services/bookCar');
let insertTravelers = require('./services/insertTravelers');

//
let addUserCard = require('./services/addUserCard');
let getUserBooking_Hotels = require('./services/getUserBooking_Hotels');
let getUserBooking_Flights = require('./services/getUserBooking_Flights');
let getUserBooking_Cars = require('./services/getUserBooking_Cars');
let getHotelRooms = require('./services/getHotelRooms.js');
let fetchUserProfile = require('./services/fetchUserProfile');
let editUserProfile = require('./services/editUserProfile');
let getUserProfile = require('./services/getUserProfile');
let getCreditCardDetails = require('./services/getCreditCardDetails');

let logAnalytics = require('./services/admin/logAnalytics');
let top10Properties = require('./services/admin/top10Properties');
let top10Hosts = require('./services/admin/top10Hosts');
let cityWiseRevenue = require('./services/admin/cityWiseRevenue');
let reviewsOnProperties = require('./services/admin/reviewsOnProperties');
let logUserTracingTree = require('./services/admin/logUserTracingTree');
//let usertimeperpages = require('./services/admin/usertimeperpages');

let loginConsumer = connection.getConsumerObj("login_topic");
let signupConsumer = connection.getConsumerObj("signup_topic");
let addFlightConsumer = connection.getConsumerObj(req_topics.ADD_FLIGHT);

let addHotelConsumer = connection.getConsumerObj(req_topics.ADD_HOTEL);
let fetchHotelsConsumer = connection.getConsumerObj(req_topics.FETCH_HOTELS);
let modifyRoomsConsumer = connection.getConsumerObj(req_topics.CHANGE_ROOMS);
let fetchflightsConsumer = connection.getConsumerObj(req_topics.FETCH_FLIGHTS);
let modifyHotelConsumer = connection.getConsumerObj(req_topics.MODIFY_HOTEL);
let hotelListing_Consumer = connection.getConsumerObj(req_topics.HOTEL_LISTING);
let modifyFlightConsumer = connection.getConsumerObj(req_topics.MODIFY_FLIGHT);
let modifyFlightClassConsumer = connection.getConsumerObj(req_topics.MODIFY_FLIGHTCLASS);
let addCarConsumer = connection.getConsumerObj(req_topics.ADD_CAR);
let addHostConsumer = connection.getConsumerObj(req_topics.ADD_HOST);
let fetchHostConsumer = connection.getConsumerObj(req_topics.FETCH_HOSTS);
let modifyHostConsumer = connection.getConsumerObj(req_topics.MODIFY_HOST);
let fetchUsersConsumer = connection.getConsumerObj(req_topics.FETCH_USERS);
let modifyUsersConsumer = connection.getConsumerObj(req_topics.MODIFY_USERS);
let fetchCarsConsumer = connection.getConsumerObj(req_topics.FETCH_CARS);
let modifyCarConsumer = connection.getConsumerObj(req_topics.MODIFY_CAR);
let fetchUserProfileConsumer = connection.getConsumerObj(req_topics.FETCH_USERPROFILE);
let fetchHotelBookingsConsumer = connection.getConsumerObj(req_topics.FETCH_HOTELBOOKINGS);
let fetchCarBookingsConsumer = connection.getConsumerObj(req_topics.FETCH_CARBOOKINGS);
let fetchFlightBookingsConsumer = connection.getConsumerObj(req_topics.FETCH_FLIGHTBOOKINGS);
let userTimePerPagesConsumer = connection.getConsumerObj(req_topics.FETCH_USERTIMEPERPAGE);
// let fetchUserBookingsConsumer = connection.getConsumerObj(req_topics.FETCH_USERBOOKINGS);

//
let getFlightDetails_Consumer = connection.getConsumerObj(req_topics.FLIGHT_DETAILS);
let getHotelDetails_Consumer = connection.getConsumerObj(req_topics.HOTEL_DETAILS);
let getCarDetails_Consumer = connection.getConsumerObj(req_topics.CAR_DETAILS);
let getUserDetails_Consumer = connection.getConsumerObj(req_topics.USER_DETAILS);
let bookFlight_Consumer = connection.getConsumerObj(req_topics.BOOK_FLIGHT);
let bookHotel_Consumer = connection.getConsumerObj(req_topics.BOOK_HOTEL);
let bookCar_Consumer = connection.getConsumerObj(req_topics.BOOK_CAR);
let insertTravelers_Consumer = connection.getConsumerObj(req_topics.INSERT_TRAVELERS);

let flightListing_Consumer = connection.getConsumerObj(req_topics.FLIGHT_LISTING);
let carListing_Consumer = connection.getConsumerObj(req_topics.CAR_LISTING);

//
let getHotelRoomsConsumer = connection.getConsumerObj("fetchhotels_topic");
let addUserCardConsumer = connection.getConsumerObj("addusercard_topic");
let getUserBooking_InfoConsumer = connection.getConsumerObj("getbookinguser_topic");
let editUserProfileConsumer = connection.getConsumerObj("editprofileuser_topic");
let getUserProfileConsumer = connection.getConsumerObj("getuserprofileinfo_topic");
let getCreditCardDetailsConsumer = connection.getConsumerObj("getcreditcarddetails_topic");

let logAnalyticsConsumer = connection.getConsumerObj(req_topics.LOG_ANALYTICS_DATA);
let top10PropertiesConsumer = connection.getConsumerObj(req_topics.TOP_10_PROPERTIES);
let top10HostsConsumer = connection.getConsumerObj(req_topics.TOP_10_HOSTS);
let cityWiseRevenueConsumer = connection.getConsumerObj(req_topics.CITY_WISE_REVENUE);
let reviewsOnPropertiesConsumer = connection.getConsumerObj(req_topics.REVIEWS_ON_PROPERTIES);
let logUserTracingTreeConsumer = connection.getConsumerObj(req_topics.LOG_USER_TRACING_TREE);

try {

    loginConsumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        login.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            let payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                // console.log(data);
                console.log(payloads);
            });
            // return;
        });
    });

    signupConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        signup.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            let payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                // console.log(data);
                console.log(payloads);
            });
            // return;
        });
    });

        

    getUserProfileConsumer.on('message', function (message) {
        console.log("17");
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        getUserProfile.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            let payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log("18");
                console.log(payloads);
            });
            // return;
        });
    });


    
    fetchUserProfileConsumer.on('message', function (message) {
        console.log('message received');
        console.log(message);
        console.log(message.value);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        console.log(data.replyTo);

        fetchUserProfile.handle_request(data.data, function (err, res) {
            if (err) {
                res.error = err;
            }
            console.log('after handle' + res);
            let payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                // console.log(data);
                console.log("Payload : ");
                console.log(payloads);
            });
        });
    });

    
}
catch (e) {
    console.log(e)
}

