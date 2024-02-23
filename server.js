// Required express library
const express = require('express');
const bodyParser = require('body-parser');

const logger = require('./middlewares/logger');
const unknownEndPoint = require('./middlewares/unknownEndPoint');

// Create an express application
const app = express();

// Routers
const statesRouter = require('./routes/states');
const favoritesRouter = require('./routes/favorites');
const usersRouter = require('./routes/users');

// Middlewares
app.use(logger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use('/states', statesRouter);
app.use('/fav', favoritesRouter);
app.use('/users', usersRouter);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Port
const PORT = process.env.PORT || 3000;

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use(unknownEndPoint);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
