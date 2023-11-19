# Dazn Test Project API

## API Setup Instructions:

1. **Clone the Repository:**
   ```bash
   git clone <https://github.com/rajeshS32/daznProject.git>
   cd <repository-directory>
   ```

2. **Install Dependencies:**
   ```bash
   npm i nest new dazn-test-project 
   @nestjs/cli 
   nest g controller user 
   nest g service user
   nest g controller auth 
   nest g service auth
   nest g controller movies 
   nest g service movies
   @nestjs/mongoose
   nodemon
   mongoose
   dotenv
   bcrypt
   joi
   jsonwebtoken
   jwt-decode
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the root directory.
   - Define environment variables for Port and Environment.

3. **Configure main.ts:**
   - configure main.ts starts by NestFactory, and initialize the project

4. **Start the Server:**
   ```bash
   npm start
   ```
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Running the app
The API should now be running on http://localhost:5032

## Stay in touch
- Author - [Rajesh S] 

## License

Nest is [MIT licensed](LICENSE).


## API Documentation:

# GET /getAllMovies
Description: Get a list of all movies.
Request:
bash
Copy code
curl http://localhost:5032/api/movies/getAllMovies
Response:
json
Copy code
[
  {
    "updatedBy": null,
            "_id": "655a886439183bdf87b1c083",
            "title": "abc",
            "genre": "comedy",
            "rating": 5,
            "link": "www.comedy.com",
            "addedBy": "655a864c679e94c2c12ed5ec",
            "createdAt": "2023-11-19T22:12:52.551Z",
            "updatedAt": "2023-11-19T22:12:52.551Z",
            "__v": 0
  },
  // ... other movies
]

# GET getByTitleOrGenre/:search
Description: Get details of a specific movie by title/genre.
Request:
bash
Copy code
curl http://localhost:5032/api/movies/getByTitleOrGenre/:search
Response:
json
Copy code
{
      "_id": "655a8980a41e24ed33287505",
        "updatedBy": "655a864c679e94c2c12ed5ec",
        "title": "wars",
        "genre": "action",
        "rating": 7,
        "link": "www.action.com",
        "addedBy": "655a864c679e94c2c12ed5ec",
        "createdAt": "2023-11-19T22:17:36.208Z",
        "updatedAt": "2023-11-19T22:21:14.342Z",
        "__v": 0
}

# POST /movies
Description: Add a new movie.
Request:
bash
Copy code
curl -X POST -H "Content-Type: application/json" -d '{"title": "New Movie", "genre": "Drama", "rating": 6, "link": "google.com"}' 
http://localhost:5032/api/movies/addMoviesmovies
Response:
json
Copy code
{
    "updatedBy": null,
        "title": "war",
        "genre": "action",
        "rating": 5,
        "link": "www.comedy.com",
        "addedBy": "655a864c679e94c2c12ed5ec",
        "_id": "655a8980a41e24ed33287505",
        "createdAt": "2023-11-19T22:17:36.208Z",
        "updatedAt": "2023-11-19T22:17:36.208Z",
        "__v": 0
}

# PUT /movies/:id
Description: Update an existing movie by ID.
Request:
bash
Copy code
curl -X PUT -H "Content-Type: application/json" -d '{"id": "655a8980a41e24ed33287505", "title": "New Movie", "genre": "Drama", "rating": 6, "link": "google.com"}' http://localhost:5032/api/movies/updateMovies
Response:
json
Copy code
{
    "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
}

# DELETE /movies/:id
Description: Delete a movie by ID.
Request:
bash
Copy code
curl -X DELETEhttp://localhost:5032/api/movies/deleteMovie/655a886439183bdf87b1c083
Response:
json
Copy code
{
  "message": "Movie deleted successfully"
}