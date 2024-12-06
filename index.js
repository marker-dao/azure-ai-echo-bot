const express = require('express');
const { BotFrameworkAdapter } = require('botbuilder');

const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId || '',
  appPassword: process.env.MicrosoftAppPassword || ''
});

const app = express();
app.use(express.json());

const port = process.env.PORT || 3978;

app.listen(port, () => {
  console.log(`\nServer running on port ${port}`);
});

app.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    if (context.activity.type === 'message') {
      await context.sendActivity(`I'm an echo bot created by Marker DAO (mark_nikolsky@outlook.com) for testing purposes only. You said: ${context.activity.text}`);
    }
  });
});
