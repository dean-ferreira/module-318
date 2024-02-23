const express = require('express');
const router = express.Router();
const users = require('../data/users');

// Get All Users
router.get('/', (req, res) => {
    res.json(users);
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

// Get User By ID
router.get('/:id', (req, res) => {
    res.json(users.find((user) => user.id === parseInt(req.params.id)));
});

module.exports = router;
