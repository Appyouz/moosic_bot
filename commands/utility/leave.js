const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel, getVoiceConnections } = require("@discordjs/voice");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Bot will leave your current voice."),
  async execute(interaction) {
    const activeVoiceChannel = interaction.member.voice.channel;
    try {
      const connection = joinVoiceChannel({
        channelId: activeVoiceChannel.id,
        guildId: activeVoiceChannel.guild.id,
        adapterCreator: activeVoiceChannel.guild.voiceAdapterCreator,
      });

      await interaction.reply("Leaving BOYS!!.");
      connection.destroy();
    }

    catch (error) {
      console.log(error);
      await interaction.reply("Could not Leave voice channel BOYS!!.");
    }
  },
};

