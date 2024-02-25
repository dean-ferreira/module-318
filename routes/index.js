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

function findThreeCheapestStates(statesPrices) {
    let averages = [];
    for (let state of statesPrices) {
        let average = calculateAveragePrice(state);
        state.average = average;
        averages.push(state);
    }
    averages.sort((a, b) => a.average - b.average);
    return averages.slice(0, 3);
}

router.get('/', (req, res) => {
    const cheapestStates = findThreeCheapestStates(states);
    res.render('index', { cheapestStates: cheapestStates });
});

module.exports = router;
