const {SlashCommandBuilder} = require("discord.js")
const { useQueue} = require("discord-player")

module.exports = {
  data: new SlashCommandBuilder()
      .setName("skip")
      .setDescription("Skip the currently playing song."),
  async execute(interaction){
    const queue = useQueue(interaction.guild);
    if(!queue){
      return interaction.reply(
        "This server does not have an active player session."
      );
    }

    if(!queue.isPlaying()){
      return interaction.reply("There is no track playing.")
    }

    queue.node.skip();

    return interaction.reply("The current song has been skipped.");
  }



}
