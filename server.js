// Required express library
const express = require('express');

// Create an express application
const app = express();

// Routers
const statesRouter = require('./routes/states');

app.use('/states', statesRouter);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Port
const PORT = process.env.PORT || 3000;

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
