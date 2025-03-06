const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Reply with Pong BOYS!!"),
  async execute(interaction) {
    await interaction.reply('Pong BOYS!!')
  },
}
