const express = require('express');
const router = express.Router();

const states = require('../data/states');

// Get All States
router.get('/', (req, res) => {
    return res.send(states);
});

// Get State by Name
router.route('/:name').get((req, res) => {
    const state = states.find(
        (state) => state.name.toLowerCase() === req.params.name.toLowerCase()
    );
    if (!state) {
        return res.status(404).send('State not found');
    }
    return res.send(state);
});

module.exports = router;
