require('dotenv').config();
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);
const port = process.env.PORT || 3000;


// Handle interactions from messages with a `callback_id` of `welcome_button`
slackInteractions.action('welcome_button', (payload, respond) => {
  // `payload` contains information about the action
  // see: https://api.slack.com/docs/interactive-message-field-guide#action_url_invocation_payload
  console.log(payload);

  // `respond` is a function that can be used to follow up on the action with a message
  respond({
    text: 'Success!',
  });

  // The return value is used to update the message where the action occurred immediately.
  // Use this to items like buttons and menus that you only want a user to interact with once.
  return {
    text: 'Processing...',
  }
});

// Handle interactions from messages containing an action block with an `action_id` of `select_coffee`
slackInteractions.action({ actionId: 'select_coffee' }, (payload, respond) => {
  // `payload` contains information about the action
  // Block Kit Builder can be used to explore the payload shape for various action blocks:
  // https://api.slack.com/tools/block-kit-builder

  // `respond` and return value are the same as above.
});

// Start the built-in HTTP server
slackInteractions.start(port).then(() => {
  // Listening on path '/slack/actions' by default
  console.log(`server listening on port ${port}`);
});