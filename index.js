'use strict';

const projectId = 'dnd-wiki-ca7bd';
const sessionId = 'quickstart-session-id';
const languageCode = 'en';

// server stuff
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const ex = express();

// let's decrypt the keys
const auth = require('./config');

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// The text query request.
const request = {
    session: sessionPath,
    source: 'web',
    capabilities: ['screen', 'audio'],
    queryInput: {
        text: {
            text: 'hi',
            languageCode: languageCode,
        },
    },
};

// Send request and log result
function dialogflowBridge(req, res) {
  request.queryInput.text.text = req.query.input;
    return sessionClient
        .detectIntent(request)
        .then(response => {
          return res.json(response[0].queryResult);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}

ex.use(bodyParser.json());
ex.use(compression(9))
ex.use('/', express.static('./docs'));
ex.get('/bridge', dialogflowBridge);
const port = process.env.PORT || 3003;
ex.listen(port, () => {
  if (!process.env.SILENT) console.log('Spell Book is open on port '+port);
});
