const { SlashCommandBuilder } = require('discord.js');
const  { useQueue } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Display the current playing song BOYS!!"),
  async execute(interaction) {
    // const queue = useQueue();

const queue = useQueue(interaction.guild.id);
    if(!queue){
      return interaction.reply("This server does not have an active player session.");
    }

    const currentSong = queue.currentTrack;

    if(!currentSong) {
      return interaction.reply("Empty Queue: Add some songs BOYS!!");
    }
  return interaction.reply(`Now playing: ${currentSong.title}`);
  }

}
