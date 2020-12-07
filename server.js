'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { handleClients, handleClient, handleCreatesClient, handleDeleteClient} = require('./handlers/clientHandlers');
const { handleHangmanSpecificWord,  handleHangmanRamdomWord, handleHangmanGuessLetter } = require('./handlers/hangmanHandlers')

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get('/clients', handleClients)
  .get('/client/:id', handleClient)
  .post('/clients', handleCreatesClient)
  .delete('/client/:id', handleDeleteClient)
  .get('/hangman/word/:id', handleHangmanSpecificWord)
  .get('/hangman/word', handleHangmanRamdomWord)
  .get('/hangman/guess/:id/:letter', handleHangmanGuessLetter)

  .listen(8000, () => console.log(`Listening on port 8000`));
