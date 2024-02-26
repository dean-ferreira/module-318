const express = require('express');
const router = express.Router();

const states = require('../data/states');
const favorites = require('../data/favorites');

function getFavStates(favArray) {
    let favStates = [];
    favArray.forEach((favorite) => {
        states.find((state) => {
            if (state.name === favorite.state_name) {
                state['favorite_id'] = favorite.id;
                favStates.push(state);
            }
        });
    });
    return favStates;
}

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
    const userFavorites = favorites.filter(
        (favorite) => favorite.user_id === parseInt(10)
    );
    let userFavStates = getFavStates(userFavorites);
    res.render('index', {
        cheapestStates: cheapestStates,
        userFavStates: userFavStates,
    });
});

module.exports = router;
