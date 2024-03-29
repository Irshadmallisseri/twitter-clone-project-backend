const express = require('express')
const PORT = 8080
const app = express()
const cors = require('cors')
require("dotenv").config();
const mongoose = require('mongoose')
const path = require('path')
const { MONGOOSE_URL } = require('./config')

global.__basedire = __dirname;
mongoose.connect(MONGOOSE_URL);

try {
    mongoose.connection.on('connected', () => {
        console.log('DB Connecetd')
    })
    
    mongoose.connection.on('error', (error) => {
        console.log("Some error occured")
        console.log(error)
    })
} catch (error) {
    console.log("Some error occured");
    console.log(error);
}

app.use(cors())
app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'images')))

require('./models/user_model')
require('./models/tweet_model')

app.use(require('./routes/auth_route'));
app.use(require('./routes/user_route'));
app.use(require('./routes/tweet_route'));

app.listen(PORT, () => {
    console.log("Server started");
});
