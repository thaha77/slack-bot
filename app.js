const { App } = require('@slack/bolt');
const axios = require('axios');
require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

// Hello command
app.message('hello', async ({ message, say }) => {
  await say(`Hello Black Shadow! How are you? 👋`);
});

// Help command
app.command('/dsb-help', async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `\`Available Commands:\` \n/dsb-ping - Check bot latency \n/dsb-catfact - Get a cat fact \n/dsb-joke - Get a random joke`
  });
});

// Cat Fact command
app.command('/dsb-catfact', async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get('https://catfact.ninja/fact');
    await respond({ text: `🐱 Cat Fact: \n${response.data.fact}` });
  } catch (error) {
    await respond({ text: 'Failed to fetch a cat fact.' });
  }
});

// Joke command
app.command('/dsb-joke', async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    await respond({ text: `😂 Joke: \n${response.data.setup} \n*${response.data.punchline}*` });
  } catch (error) {
    await respond({ text: 'Failed to fetch a joke.' });
  }
});

(async () => {
  await app.start();
  console.log('⚡️ Slack bot is ready with API powers!');
})();
