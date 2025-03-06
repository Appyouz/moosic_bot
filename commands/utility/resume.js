const { SlashCommandBuilder } = require("discord.js");
const { useQueue, useTimeline } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resumes the current playing song."),
  async execute(interaction) {
    const queue = useQueue(interaction.guild);
    const timeline = useTimeline({
      node: interaction.guild,
    });
    if (!timeline) {
      return interaction.reply("This server does not have an active player session.");
    }

    const currentSong = queue.currentTrack;
    if (!currentSong) {
      return interaction.reply('No song is currently playing.');
    }
    const resume = timeline.resume();
    if(resume){
    return interaction.reply(`Resumed: ${currentSong.title} .`);
    }else {
      return interaction.reply("Song is already on resume")
    }
  },
}
