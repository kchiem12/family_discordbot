require("dotenv").config();

const { Client, Events, GatewayIntentBits } = require("discord.js");
// import the discord bot token later

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
});

// only once
client.once(Events.ClientReady, (c) => {
  console.log("Ready! Logged in as " + c.user.tag);
});

client.login(process.env.BOT_TOKEN);
