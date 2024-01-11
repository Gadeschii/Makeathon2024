// Import necessary modules
const cors = require('cors'); 
const authRoutes = require('./auth/auth.Routers');
const express = require('express');

// Import configuration files
const properties = require('./config/properties.js');
const DB =  require('./config/db.js');

// Initialize the database
DB();

// Create an Express application
const app = express();
// Create a new router object
const router = express.Router();

// Import and configure body-parser
const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

// Use body-parser middleware to parse JSON and URL encoded data
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Use CORS middleware to handle cross-origin requests
app.use(cors());

// Use the router for routes starting with '/api'
app.use('/api', router);  
// Import routes from auth.Routers
authRoutes(router);

// Define a route for the root path
router.get('/', (req, res) => {
    res.send("Hello World");
});

// Use the router for all routes
app.use(router);

// Start the server on the specified port
app.listen(properties.PORT, () => console.log(`Server running on port ${properties.PORT}`));