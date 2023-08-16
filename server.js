require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler')
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3500;

//connect to mongoDB
connectDB();

//custom middleware logger
app.use(logger);
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
//cross origin resource sharing
app.use(cors());

// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method);
// });
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
//to serve static files like text, images, keep inside public folder
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

//app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
app.use('/customers', require('./routes/api/customers'));
app.use('/companies', require('./routes/api/company'));
app.use('/suppliers', require('./routes/api/suppliers'));

app.use('/constants/states', require('./routes/api/constants/stateRoute'));
app.use('/constants/cities', require('./routes/api/constants/cityRoute'));
app.use('/constants/sizes', require('./routes/api/constants/sizeRoute'));
app.use('/constants/fabrics', require('./routes/api/constants/fabricRoute'));
app.use('/constants/colors', require('./routes/api/constants/colorRoute'));
app.use('/constants/categories', require('./routes/api/constants/categoryRoute'));
app.use('/constants/dealers', require('./routes/api/constants/dealerRoute'));
app.use('/constants/hsn', require('./routes/api/constants/hsnRoute'));
app.use('/constants/taxes', require('./routes/api/constants/taxRoute'));
app.use('/constants/taxSlabs', require('./routes/api/constants/taxSlabRoute'));

// app.all('/*', (req, res) => {
//     res.status(404).send('404 Anything Nothing is there')
// })

app.use(errorHandler);
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

