// Import necessary modules
const cors = require('cors'); 
const authRoutes = require('./auth/auth.Routers');
const express = require('express');

// Import configuration files
const properties = require('./config/properties.js');
const DB =  require('./config/db.js');


// const fs = require('fs');
// const https = require('https');
const localhost = 'localhost ';
const hostITQ = '192.168.1.125';


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

// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem'),
//   passphrase: 'jjjj'
// };

// https.createServer(options, app).listen(properties.PORT, () => {
//   console.log(`Server running on port ${properties.PORT}`);
// });

// Use body-parser middleware to parse JSON and URL encoded data
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

var corsOptions = {
  origin: [`http://${localhost}:4200`, 'http://localhost:3000'], 
  
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions));

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
//app.listen(properties.PORT, () => console.log(`Server running on port ${properties.PORT}`));