require('dotenv').config();

const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const { Player } = require('discord-player');
const { DefaultExtractors } = require('@discord-player/extractor');

const { GuildQueueEvent } = require('discord-player');


const client = new Client({
  intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildVoiceStates]
});


client.commands = new Collection();
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// this is the entrypoint for discord-player based application
const player = new Player(client);
player.extractors.loadMulti(DefaultExtractors)

// check lifecycle
player.events.on(GuildQueueEvent.PlayerStart, async (queue, track) => {
  // Get the metadata stored on the queue
  const { channel } = queue.metadata;
  // Send a message to the channel
  await channel.send(`Now playing: ${track.title}`);
});
// Handle the event when a track finishes playing
player.events.on(GuildQueueEvent.PlayerFinish, async (queue, track) => {
  // Get the metadata stored on the queue
  const { channel } = queue.metadata;
  // Send a message to the channel
  await channel.send(`Finished playing ${track.title}`);
});
client.login(process.env.TOKEN);
