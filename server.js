// Required express library
const express = require('express');

// Require Morgan
const morgan = require('morgan');

// Require the filesystem module
const fs = require('fs');

// Require the path module
const path = require('path');

// Create an express application
const app = express();

// Middleware for loggin HTTP requests using Morgan
app.use(morgan('dev'));

// Require body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

// Port
const PORT = process.env.PORT || 3000;

// Example data
const posts = [
    {
        id: 1,
        title: 'Post 1',
        content: 'This is the first post',
    },
    {
        id: 2,
        title: 'Post 2',
        content: 'This is the second post',
    },
    {
        id: 3,
        title: 'Post 3',
        content: 'This is the third post',
    },
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { posts });
});

app.get('/posts', (req, res) => {
    res.render('posts', { posts, name: '' });
});

app.get('/posts/:name', (req, res) => {
    const name = req.params.name;
    res.render('posts', { posts, name });
});

app.post('/submitForm', (req, res) => {
    const { name } = req.body;
    console.log('Received data:', name);
    res.redirect(`/posts/${name}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
