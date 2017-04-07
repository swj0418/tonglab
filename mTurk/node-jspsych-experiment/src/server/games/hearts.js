/* Copyright G. Hemingway @2017 - All rights reserved */
"use strict";


function shuffleCards(jokers) {
    /* Return an array of 52 cards (if jokers is false, 54 otherwise). Carefully follow the instructions in the README */
    let cards = [];
    ['spades', 'clubs', 'hearts', 'diamonds'].forEach(suit => {
        ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'].forEach(value => {
            cards.push({ suit: suit, value: value });
        });
    });
    // Add in jokers here
    if (jokers) {}
    // Now shuffle
    let deck = [];
    while (cards.length > 0) {
        // Find a random number between 0 and cards.length - 1
        const index = Math.floor((Math.random() * cards.length));
        deck.push(cards[index]);
        cards.splice(index, 1);
    }
    return deck;
}

function initialState(config) {
    /* Use the above function.  Generate and return an initial state for a game */
    let state = {
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10),
        state: {
            player1: { name: "tumbler",     cards: [], points: 0 },
            player2: { name: "eagle",       cards: [], points: 0 },
            player3: { name: "rawhide",     cards: [], points: 0 },
            player4: { name: "timberwolf",  cards: [], points: 0 },
            turn: undefined
        },
        moves: [],
        type: config.game,
        color: config.color,
        start: Date.now(),
        duration: 0,
        score: 0,
        winner: '',
        cards_remaining: 52,
        active: true
    };
    // Get the shuffled deck and distribute it to the players
    const deck = shuffleCards(false);
    for (let i = 0; i < 13; ++i) {
        ['player1', 'player2', 'player3', 'player4'].forEach((player, j) => {
            const index = i * 4 + j;
            if (deck[index].suit === 'clubs' && deck[index].value === 2) {
                state.state.turn = state.state[player].name;
            }
            state.state[player].cards.push(deck[index]);
        });
    }
    return state;
}

module.exports = {
    initialState: initialState
};

// Are we getting a fair deal?
// let stats = {};
// for(let i = 0; i<1000000; i++) {
//     const state = initialState({
//         game: 'hearts',
//         color: 'red'
//     });
//     stats[state.state.turn] = stats[state.state.turn] ? stats[state.state.turn] + 1 : 1;
// }
// console.log(stats);