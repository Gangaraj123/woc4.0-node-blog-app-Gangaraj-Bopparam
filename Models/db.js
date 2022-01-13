// interacting with database-mongodbAtlas
const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://202001107:Bopparam123@cluster0.i2yhz.mongodb.net/MyDataBase?retryWrites=true&w=majority';

const ConnectToMongoose = (app) => {
    mongoose.connect(mongoURI)
        .then((result) => {
            console.log('Connected!!')
            app.listen(3000); // launching app after connected to db
            // listening on port 3000
        })
        .catch((err) => {
            console.log("some error occured");
        })
}

module.exports = ConnectToMongoose;