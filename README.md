# WTWR (What to Wear?): Back End
The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.
## Project Functionality

The WTWR backend provides a RESTful API that allows users to:
- **User Management**: Create and retrieve user profiles with authentication support
- **Clothing Item Management**: Add, retrieve, and delete clothing items organized by weather categories
- **Liking System**: Users can like and unlike clothing items with persistent data storage
- **Data Validation**: Enforces validation rules for user inputs (name length, valid URLs, etc.)
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes (400, 401, 403, 404, 500)

The backend manages a collection of clothing items categorized by weather conditions (hot, warm, cold) and allows users to curate their personal wardrobe.

## Technologies & Techniques

### Core Technologies
- **Node.js & Express.js** - Server framework and HTTP request handling
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - ODM (Object Data Modeling) for MongoDB schema validation and querying

### Key Techniques
- **RESTful API Design** - Standard HTTP methods (GET, POST, DELETE) for resource management
- **Error Handling** - Centralized error handling with custom error types and status codes
- **Data Validation** - Schema-based validation using Mongoose (minlength, maxlength, required fields, URL validation)
- **Middleware Patterns** - Express middleware for request processing and error handling
- **MongoDB Operations** - Document creation, querying, updating, and deletion
- **Async/Promise Handling** - Promise chains for database operations
## Running the Project
`npm run start` — to launch the server 

`npm run dev` — to launch the server with the hot reload feature


### Testing
Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
