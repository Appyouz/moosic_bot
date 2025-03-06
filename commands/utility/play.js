const { SlashCommandBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');
const { PermissionsBitField } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Playing the song to playlist BOYS!!")
    .addStringOption(option =>
      option.setName('query')
        .setDescription('Name of the song.')
        .setRequired(true)
    ),
  async execute(interaction) {
    const player = useMainPlayer();
    const voiceChannel = interaction.member.voice.channel;
    const query = interaction.options.getString('query', true);

    if (!voiceChannel) {
      return interaction.reply('You need to be in a voice channel to play music!',);
    }
    // Check if the bot is already playing in a different voice channel
    if (
      interaction.guild.members.me.voice.channel &&
      interaction.guild.members.me.voice.channel !== voiceChannel
    ) {
      return interaction.reply(
        'I am already playing in a different voice channel!',
      );
    }

    // Check if the bot has permission to join the voice channel
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.Connect,
      )
    ) {
      return interaction.reply(
        'I do not have permission to join your voice channel!',
      );
    }

    // Check if the bot has permission to speak in the voice channel
    if (
      !interaction.guild.members.me
        .permissionsIn(voiceChannel)
        .has(PermissionsBitField.Flags.Speak)
    ) {
      return interaction.reply(
        'I do not have permission to speak in your voice channel!',
      );
    }

    await interaction.deferReply();

    try {
      const { track } = await player.play(voiceChannel, query, {
        nodeOptions: {
          // nodeOptions are the options for guild node (aka your queue in simple word)
          metadata: { channel: interaction.channel }, // we can access this metadata object using queue.metadata later on
        },
      });

      return interaction.followUp(`**${track.title}** enqueued BOYS!`);
    } catch (error) {
      console.error(error);
      return interaction.followUp(`Something went wrong: ${error}`);
    }

  },
}


