const {SlashCommandBuilder} = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
  cooldown:5,
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
            const channel = interaction.member.voice.channel;
            if (!channel)
              return interaction.reply('You are not connected to a voice channel!'); 
            const query = interaction.options.getString('query', true);
           
            await interaction.deferReply();
           
            try {
              const { track } = await player.play(channel, query, {
                nodeOptions: {
                  // nodeOptions are the options for guild node (aka your queue in simple word)
                  metadata: interaction, // we can access this metadata object using queue.metadata later on
                },
              });
           
              return interaction.followUp(`**${track.title}** enqueued BOYS!`);
            } catch (e) {
              return interaction.followUp(`Something went wrong: ${e}`);
            }

            },
}

