let assert = require('assert');
let request = require('request');
let http = require("http");
const { baseUrl, describeApi, getAuthHeaders } = require('./helpers/apiTestConfig');
const authHeaders = getAuthHeaders();

describeApi('Testing URL and Login for Kayak', function() {

    it('should return the login if the url is correct', function(done) {
        http.get(`${baseUrl}/`, function(res) {
            console.log(res.statusCode);
            assert.equal(200, res.statusCode);
            done();
        })
    });

    it('should return error if the url is incorrect', function(done) {
        http.get(`${baseUrl}/abc`, function(res) {
            console.log(res.statusCode);
            assert.equal(404, res.statusCode);
            done();
        })
    });

    it('should login as for given username and password sent', function(done) {
        request.post(`${baseUrl}/users/login`, {
            form : {
                username : 'shenoudafarouk23@yahoo.com',
                password : '123456789',
                credentials: true
            }
        }, function(error, response, body) {
            // console.log(response.session.username);
            console.log(response.statusCode);
            assert.equal(201, response.statusCode);
            done();
        });
    });

    it('should not login as invalid username and password sent', function(done) {
        request.post(`${baseUrl}/users/login`, {
            form : {
                username : 'addscdsmin',
                password : 'sdcds',
                credentials: true
            }
        }, function(error, response, body) {
            // console.log(response.session.username);
            console.log(response.statusCode);
            assert.equal(401, response.statusCode);
            done();
        });
    });
});

// describe('fetch Hotels', function () {
//     it('should fetch hotels', function(done) {
//         request.post('http://localhost:3001/admin/fetchHotels', {
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });

//     it('should fetch hotels filtering by hotelName', function(done) {
//         request.post('http://localhost:3001/admin/fetchHotels', {
//             form : {
//                 hotelName : 'oberoi',
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });

//     it('should fetch hotels filtering by city', function(done) {
//         request.post('http://localhost:3001/admin/fetchHotels', {
//             form : {
//                 city : 'san jose',
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });

//     it('should not fetch any hotels filtering by incorrect value of city', function(done) {
//         request.post('http://localhost:3001/admin/fetchHotels', {
//             form : {
//                 city : 'vnerinvciern243',
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(204, response.statusCode);
//             done();
//         });
//     });
// });

// describe('fetch Flights', function () {
//     it('should fetch hotels', function(done) {
//         request.post('http://localhost:3001/admin/fetchFlights', {
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });

//     it('should fetch Flights filtering by Fligth No', function(done) {
//         request.post('http://localhost:3001/admin/fetchFlights', {
//             form : {
//                 flightNo : '123'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });

//     it('should fetch Flights filtering by Flight Operator', function(done) {
//         request.post('http://localhost:3001/admin/fetchFlights', {
//             form : {
//                 flightOperator : 'southwest'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });

//     it('should fetch Flights filtering by origin City', function(done) {
//         request.post('http://localhost:3001/admin/fetchFlights', {
//             form : {
//                 origin : 'sjc'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });

//     it('should not fetch Flights for incorrect value', function(done) {
//         request.post('http://localhost:3001/admin/fetchFlights', {
//             form : {
//                 origin : 'scwew234'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(204, response.statusCode);
//             done();
//         });
//     });
// });

// describe('fetch Cars', function () {
//     it('should fetch Cars', function(done) {
//         request.post('http://localhost:3001/admin/fetchCars', {
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });


//     it('should fetch Cars filtering by hotelName', function(done) {
//         request.post('http://localhost:3001/admin/fetchCars', {
//             form : {
//                 carType : 'sedan'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });

//     it('should fetch Cars filtering by city', function(done) {
//         request.post('http://localhost:3001/admin/fetchCars', {
//             form : {
//                 carMake : 'honda'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });

//     it('should fetch Cars filtering by city', function(done) {
//         request.post('http://localhost:3001/admin/fetchCars', {
//             form : {
//                 city : 'san jose'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });

//     it('should not fetch Cars details for incorrect value', function(done) {
//         request.post('http://localhost:3001/admin/fetchCars', {
//             form : {
//                 carMake : 'sdcdscdscds'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(204, response.statusCode);
//             done();
//         });
//     });
// });

// describe('fetch Hotel Bookings', function () {
//     it('should fetch Hotel Bookings', function(done) {
//         request.post('http://localhost:3001/admin/fetchHotelBookings', {
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });

//     it('should fetch Hotel  Bookings by booking Id', function(done) {
//         request.post('http://localhost:3001/admin/fetchHotelBookings', {
//             form : {
//                 bookingId : '10'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });

//     it('should fetch Hotel  Bookings by username', function(done) {
//         request.post('http://localhost:3001/admin/fetchHotelBookings', {
//             form : {
//                 searchbyusername : 'sjsu@sjsu.com'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });



//     it('Negative Testing. : should not fetch Hotel  Bookings by username', function(done) {
//         request.post('http://localhost:3001/admin/fetchHotelBookings', {
//             form : {
//                 searchbyusername : 'sidcnisdnciudsciuds'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(204, response.statusCode);
//             done();
//         });
//     });
// });

// describe('fetch Flight Bookings', function () {
//     it('should fetch Flight Bookings', function(done) {
//         request.post('http://localhost:3001/admin/fetchFlightBookings', {
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });

//     it('should fetch Flight  Bookings by booking Id', function(done) {
//         request.post('http://localhost:3001/admin/fetchFlightBookings', {
//             form : {
//                 bookingId : '34'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });

//     it('should fetch Flight  Bookings by username', function(done) {
//         request.post('http://localhost:3001/admin/fetchFlightBookings', {
//             form : {
//                 searchbyusername : 'sjsu@sjsu.com'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });



//     it('Negative Testing. : should not fetch Flight  Bookings by username', function(done) {
//         request.post('http://localhost:3001/admin/fetchFlightBookings', {
//             form : {
//                 searchbyusername : 'sidcnisdnciudsciuds'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(204, response.statusCode);
//             done();
//         });
//     });
// });

// describe('fetch Car Bookings', function () {
//     it('should fetch Car Bookings', function(done) {
//         request.post('http://localhost:3001/admin/fetchCarBookings', {
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });

//     it('should fetch Car Bookings by booking Id', function(done) {
//         request.post('http://localhost:3001/admin/fetchCarBookings', {
//             form : {
//                 bookingId : '10'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });

//     it('should fetch Car Bookings by username', function(done) {
//         request.post('http://localhost:3001/admin/fetchCarBookings', {
//             form : {
//                 searchbyusername : 'harry@sjsu.edu'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
//     });



//     it('Negative Testing. : should not fetch Car Bookings by username', function(done) {
//         request.post('http://localhost:3001/admin/fetchCarBookings', {
//             form : {
//                 searchbyusername : 'sidcnisdnciudsciuds'
//             },
//             headers
//         }, function(error, response, body) {
//             // console.log(response.session.username);
//             console.log(response.statusCode);
//             console.log(body);
//             assert.equal(204, response.statusCode);
//             done();
//         });
//     });
// });

describeApi('Add Hotel', function () {
    it('should add hotel', function(done) {
        if (!authHeaders) {
            this.skip();
            return;
        }
        request.post(`${baseUrl}/admin/addHotel`, {
            form : {
                hostId : '8',
                hotelName: 'sheraton grand',
                hotelAddress : 'san diego downtown',
                city : 'sa diego',
                state : 'california',
            zipCode : '96545',
            stars : '4'
        },
            headers: authHeaders
        }, function(error, response, body) {
            // console.log(response.session.username);
            console.log(response.statusCode);
            assert.equal(200, response.statusCode);
            done();
        });
    });
});

describeApi('Add Car', function () {
    it('should add hotel', function(done) {
        if (!authHeaders) {
            this.skip();
            return;
        }
        request.post(`${baseUrl}/admin/addCar`, {
            form : {
                hostId: '10',
                carName: 'endevour',
                carType: 'suv',
                carMake: 'ford',
                carModel: 'limited edition',
                capacity: '8',
                city: 'san diego',
                state: 'california',
                zipCode: '95463',
                price: '230',
            },
            headers: authHeaders
        }, function(error, response, body) {
            // console.log(response.session.username);
            console.log(response.statusCode);
            assert.equal(200, response.statusCode);
            done();
        });
    });
});

describeApi('Add Flight', function () {
    it('should add Flight', function(done) {
        if (!authHeaders) {
            this.skip();
            return;
        }
        request.post(`${baseUrl}/admin/addFlightData`, {
            form : {
                flightNo : 'AA223',
                hostId : '9',
                flightOperator: 'american airlines',
                departureDate : '07/12/2017',
                arrivalDate : '07/12/2017',
                departureTime : '14:05',
                arrivalTime : '16:05',
                duration : '2',
                origin : 'denver',
                destination : 'san jose',
                classes : [
                    {
                        classType: 'business',
                        price: 1000,
                        noOfSeats: 10
                    },
                    {
                        classType: 'firstclass',
                        price: 500,
                        noOfSeats: 50
                    },
                    {
                        classType: 'economy',
                        price: 150,
                        noOfSeats: 100
                    }
                ]
            },
            headers: authHeaders
        }, function(error, response, body) {
            // console.log(response.session.username);
            console.log(response.statusCode);
            assert.equal(200, response.statusCode);
            done();
        });
    });
}
);
