/* Copyright G. Hemingway @2017 - All rights reserved */
"use strict";

let crypto              = require('crypto'),
    mongoose            = require('mongoose'),
    Schema              = mongoose.Schema;

/***************** User Model *******************/

let User = new Schema({
});


/***************** Registration *******************/

module.exports = mongoose.model('User', User);
