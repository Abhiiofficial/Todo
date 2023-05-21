const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/User')
const bodyParser = require('body-parser')
const session = require('cookie-session')
const cors = require('cors')

const app = express()
app.use(express.json());
app.use('/api/v1/user', userRoute)
app.use(bodyParser.json());
app.use(session({
    secret: 'home-care-app',
    resave: false,
    saveUninitialized: false,
}));
app.use(cors())

const connect = () => {
    mongoose
        .connect(
            "mongodb+srv://DHRUVA:DHRUVA@cluster0.lp8ku9c.mongodb.net/LOVETODO?retryWrites=true&w=majority"
        )
        .then(() => {
            console.log("MONGODB CONNECTED");
        })
        .catch((err) => {
            console.log("Mongodb error : ", err);
        });
};

app.listen(8000, () => {
    connect();
    console.log(`Server started running on PORT 8000`);
});