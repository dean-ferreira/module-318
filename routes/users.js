const express = require('express');
const router = express.Router();
const users = require('../data/users');
const bcrypt = require('bcrypt');

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

router.get('/edit', (req, res) => {
    res.render('users/edit', { user: users[9] });
});

// Login User
router.post('/login', async (req, res) => {});

// Create New User
router.post('/new', async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.redirect('/users/new');
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            id: users.length + 1,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: 'user',
        };
        users.push(user);
        res.redirect('/users/login');
    } catch {
        res.redirect('/users/new');
    }
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
    return res.redirect('/');
});

// Get User By ID
router.get('/:id', (req, res) => {
    res.json(users.find((user) => user.id === parseInt(req.params.id)));
});

module.exports = router;
