const express = require('express');
const router = express.Router();

const states = require('../data/states');

function calculateAveragePrice(state) {
    let average = 0;
    let total = 0;
    total +=
        parseFloat(state.gasoline) +
        parseFloat(state.midGrade) +
        parseFloat(state.premium) +
        parseFloat(state.diesel);
    average = total / 4;
    return Math.round(average * 1000) / 1000;
}

function getAveragePrices() {
    let averages = [];
    for (let state of states) {
        let average = calculateAveragePrice(state);
        state.average = average;
        averages.push(state);
    }
    return averages;
}

// Get All States
router.get('/', (req, res) => {
    let sortedStates;
    const { sort } = req.query;
    if (sort) {
        if (sort === 'a-z') {
            sortedStates = states.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'z-a') {
            sortedStates = states.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sort === 'asc') {
            let averages = getAveragePrices(states);
            sortedStates = averages.sort((a, b) => a.average - b.average);
        } else if (sort === 'desc') {
            let averages = getAveragePrices(states);
            sortedStates = averages.sort((a, b) => b.average - a.average);
        } else {
            sortedStates = states;
        }
    } else {
        sortedStates = states;
    }
    return res.render('states/showStates', {
        states: sortedStates,
        sort: sort,
    });
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
