/* Copyright W. Ju @2017 */
'use strict';


let express     = require('express'),
    bodyParser  = require('body-parser'),
    app         = express();

/*******************************************************************/

let data = {
    quiz1: {
        class: 'CS 4288 - Web-based Applications & Architectures',
        id: 'quiz1',
        title: 'Quiz 1',
        questions: [
            { name: 'Question 1', url: 'q1.html', desc: 'DevTools' },
            { name: 'Question 2', url: 'q2.html', desc: 'URI' },
            { name: 'Question 3', url: 'q3.html', desc: 'Forms' },
            { name: 'Question 4', url: 'q4.html', desc: 'CSS Styling' },
            { name: 'Question 5', url: 'q5.html', desc: 'Scalability' },
            { name: 'Question 6', url: 'q6.html', desc: 'Feedback' }
        ]
    }
};

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