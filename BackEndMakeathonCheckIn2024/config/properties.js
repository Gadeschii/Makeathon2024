require('dotenv').config();

module.exports = {
    //PORT: process.env.PORT || 3000,
    PORT: process.env.PORT || 443,
    DB: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bgfdccw.mongodb.net/Makeathon24`
}