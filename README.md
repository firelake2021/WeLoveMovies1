# WeLoveMovies1

The application for specific routes so that users can gain access to data about movies, theaters, and reviews with use of APIs

# API Routes

Here are description of different API routes application uses.

# GET movies

Get all movies
This route will return a list of all movies. Different query parameters will allow for limiting the data that is returned.

There are two different cases to consider:

GET /movies
GET /movies?is_showing=true

# Read one movie

This route will return a single movie by ID.

There are four different cases to consider:

GET /movies/:movieId
GET /movies/:movieId
GET /movies/:movieId/theaters
GET /movies/:movieId/reviews

# Destroy review

This route will delete a review by ID. If the ID is incorrect, a 404 will be returned.

DELETE /reviews/:reviewId
The server should respond with 204 No Content.

# Update review

This route will allow you to partially or fully update a review. If the ID is incorrect, a 404 will be returned.

UPDATE /reviews/:reviewId
Create a route that responds to the following request:

PUT /reviews/:reviewId
A body like the following should be passed along with the request:

{
"score": 3,
"content": "New content..."
}

# Get all theaters

This route will return a list of all theaters. Different query parameters will allow for additional information to be included in the data that is returned.

There is one case to consider:

GET /theaters
GET /theaters
Create a route that responds to the following request:

GET /theaters
