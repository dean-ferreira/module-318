const express = require('express');
const router = express.Router();
const favorites = require('../data/favorites');
const states = require('../data/states');

function getFavStates(favArray) {
    let favStates = [];
    favArray.forEach((favorite) => {
        states.find((state) => {
            if (state.name === favorite.state_name) {
                favStates.push(state);
            }
        });
    });
    return favStates;
}

// Get All Favorites
router.get('/', async (req, res) => {
    let favStates = getFavStates(favorites);
    return res.json(favStates);
});

// Get All Favorites by User ID
router.get('/:id', (req, res) => {
    const userFavorites = favorites.filter(
        (favorite) => favorite.user_id === parseInt(req.params.id)
    );
    if (userFavorites.length === 0) {
        return res.status(404).send('Favorite not found');
    }
    let favStates = getFavStates(userFavorites);

    return res.render('favorites/showFaves', {
        states: favStates,
    });
});

// Create New Favorite
router.post('/', (req, res) => {
    if (!req.body.user_email || !req.body.user_id || !req.body.state_name) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }
    const favorite = {
        id: favorites.length + 1,
        user_email: req.body.user_email,
        user_id: req.body.user_id,
        state_name: req.body.state_name,
    };
    favorites.push(favorite);
    return res.status(201).json(favorite);
});

// Delete Favorite
router.delete('/:id', (req, res) => {
    const favorite = favorites.find(
        (favorite) => favorite.id === parseInt(req.params.id)
    );
    if (!favorite) {
        return res.status(404).json({ message: 'Favorite not found' });
    }
    const index = favorites.indexOf(favorite);
    favorites.splice(index, 1);
    return res.status(200).json(favorite);
});

module.exports = router;
