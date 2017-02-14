/* Copyright W. Ju @2017 */
'use strict';


let express     = require('express'),
    bodyParser  = require('body-parser'),
    app         = express();

/*******************************************************************/

let data = {};

/*******************************************************************/

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Respond to simple AJAX query
app.put('/mydata.json', function(req, res) {
    res.status(200).send(data);
});

/*******************************************************************/

let server = app.listen(8080, function () {
    console.log('Test Server Address: ' + server.address().port);
});