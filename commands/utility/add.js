const { SlashCommandBuilder } = require('discord.js');


module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Adding the song to playlist BOYS!!")
    .addStringOption(option =>
      option.setName('query')
        .setDescription('Name of the song.')
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const query = interaction.options.getString("query");
    await interaction.editReply(`Adding ${query} to the playlist BOYS!!`);
  },
}
