const express = require('express');
const router = express.Router();
const users = require('../data/users');

// Get All Users
router.get('/', (req, res) => {
    res.json(users);
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/new', (req, res) => {
    res.render('users/new');
});

// Create New User
router.post('/new', (req, res) => {
    if (
        !req.body.name ||
        !req.body.email ||
        !req.body.password ||
        !req.body.role
    ) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }
    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    };
    users.push(user);
    return res.status(201).json(user);
});

// Update User
router.patch('/:id', (req, res) => {
    const user = users.find((user) => user.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.role = req.body.role || user.role;
    return res.status(200).json(user);
});

// Get User By ID
router.get('/:id', (req, res) => {
    res.json(users.find((user) => user.id === parseInt(req.params.id)));
});

module.exports = router;
