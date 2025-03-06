const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel, getVoiceConnections } = require("@discordjs/voice");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Bot will join your current voice."),
  async execute(interaction) {

    //Locate active voice channel
    const activeVoiceChannel = interaction.member.voice.channel;

    if (!activeVoiceChannel) {
      return interaction.reply("Join a voice channel BOYS!!.");
    } else {
      console.log("Current VC: ", activeVoiceChannel.id);
    }

    try {
      // Join the active voice channel
      const connection = joinVoiceChannel({
        channelId: activeVoiceChannel.id,
        guildId: activeVoiceChannel.guild.id,
        adapterCreator: activeVoiceChannel.guild.voiceAdapterCreator,
      });

      console.log(getVoiceConnections());
      await interaction.reply(`Congrats BOYS!!  Joined: ${activeVoiceChannel.name}.`);

    }
    catch (error) {
      console.log(error);
      await interaction.reply("Could not join voice channel BOYS!!.");
    }
  },
};

