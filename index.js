require('dotenv').config();
const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { createEventAdapter } = require('@slack/events-api');
const port = process.env.PORT || 28410;

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);
// Create an express application
const app = express();

// Plug the adapter in as a middleware
app.use('/slack/events', slackEvents.requestListener());

// Example: If you're using a body parser, always put it after the event adapter in the middleware stack
app.use(bodyParser());

slackEvents.on('message', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

slackEvents.on('app_mention', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  slackEvents.message

});

// Tworzenie serwera
(async () => {
  const server = await slackEvents.start(port);
  console.log(`Listening for events on ${server.address().port}`);
})();