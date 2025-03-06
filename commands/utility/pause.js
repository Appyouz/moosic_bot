const { SlashCommandBuilder } = require("discord.js");
const {useQueue, useTimeline} = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
      .setName("pause")
      .setDescription("Pauses the current playing song."),
      async execute(interaction){
 const timeline = useTimeline({
    node: interaction.guild,
  });
    if(!timeline){
      return interaction.reply("This server does not have an active player session.");
    }

    // const wasPaused = timeline.paused;
    // wasPaused?timeline.resume():timeline.pause();
    // return interaction.reply(
    //   `The player is now ${wasPaused ? "playing": "paused"}.`,
    // );
    
     const wasPaused = timeline.pause();
    return interaction.reply("The player is now paused");
  },
}
