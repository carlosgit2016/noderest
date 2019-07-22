const express = require('express'); // The library main express
const bodyParser = require('body-parser'); // Middleware to parse JSON in requests
const userRoute = require('./src/routes/UsersRoutes');
require('dotenv/config'); // import the library for configure the .env files
const app = express();

app.use(bodyParser.json()); // Parse body request for all request, Middleware
app.use(bodyParser.urlencoded({ extended: true })) // ?
app.use('/user',userRoute);

app.listen(process.env.PORT_EXPRESS, () => {
    console.log('Listening on port: ', process.env.PORT_EXPRESS);
});