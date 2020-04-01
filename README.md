# Online Travel Agency

## Goal

* The goal is to build a distributed enterprise web application which enables the user not only to search for Cars, Hotels and Flights and make a booking but also can filter to get cheapest prices and login/signup along with editing user preferences and viewing travel history. As well as create a Admin side which can be used to add/edit/delete Flights, Cars and Hotels and also be able to delete the user and view the analytics/statistics.

## System Design


### Database
> Tables with large amount of data and which doesn't need transaction support in mongodb, flight car hotel
Tables with critical data and information that needs transaction support in mysql, like booking details, payment details and user info

> Database design and the data was critical for the project so To maintain consistency within team we deployed both our db on cloud. Also we used mongoose npm module, which is a wrapper for mongodb for creating structure of documents in a collection so that well defined data is inserted which helps in searching.