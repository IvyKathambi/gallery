
require('dotenv').config();
var config = {}

// Update to have your correct username and password
config.mongoURI = {
        production:process.env.MONGO_URL,
    development:process.env.MONGO_URL,
    test:process.env.MONGO_URL,
}
module.exports = config;
