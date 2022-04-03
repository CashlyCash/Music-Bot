const player = require("../../music");

module.exports = {
    ephemeral: true,
    name: "now-playing",
    description: "shows information about the current song",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.editReply({
                content: "No music is currently being played",
                ephemeral: false
            });

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return interaction.editReply({
            embeds: [
                {
                    title: "Now Playing",
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: "\u200b",
                            value: progress,
                        },
                    ],
                    color: 'RED',
                    footer: {
                        text: `Queued by <@!${queue.current.requestedBy.id}>`,
                    },
                },
            ],
            ephemeral: false
        });
    },
};
