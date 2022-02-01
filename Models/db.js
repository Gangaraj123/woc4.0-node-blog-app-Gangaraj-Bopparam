// interacting with database-mongodbAtlas
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const port=process.env.PORT || 3000;
const ConnectToMongoose = (app) => {
    mongoose.connect(process.env.MONGO_URI)
        .then((result) => {
            console.log('Connected!!')
            app.listen(port); // launching app after connected to db
            // listening on port
        })
        .catch((err) => {
            console.log("some error occured");
        })
}

module.exports = ConnectToMongoose;