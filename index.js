const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');

const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId || '',
  appPassword: process.env.MicrosoftAppPassword || ''
});

const server = restify.createServer();

server.listen(process.env.PORT || process.env.port || 8080, () => {
  console.log(`\nServer running on port ${server.url}`);
});

server.post('/api/messages', (req, res, next) => {
  adapter.processActivity(req, res, async (context) => {
    if (context.activity.type === 'message') {
      await context.sendActivity(`I'm an echo bot created by Marker DAO (mark_nikolsky@outlook.com) for testing purposes only. You said: ${context.activity.text}`);
    }
  });

  next();
});
