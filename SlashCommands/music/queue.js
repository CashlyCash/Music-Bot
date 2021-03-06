const player = require("../../music");

module.exports = {
    ephemeral: true,
    name: "queue",
    description: "display the song queue",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.editReply({
                content: "No songs are currently playing",
            });

        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `${i + 1}. [**${m.title}**](${m.url}) - <@!${
                m.requestedBy.id
            }>`;
        });

        return interaction.editReply({
            embeds: [
                {
                    title: "Song Queue",
                    description: `${tracks.join("\n")}${
                        queue.tracks.length > tracks.length
                            ? `\n...${
                                  queue.tracks.length - tracks.length === 1
                                      ? `${
                                            queue.tracks.length - tracks.length
                                        } more track`
                                      : `${
                                            queue.tracks.length - tracks.length
                                        } more tracks`
                              }`
                            : ""
                    }`,
                    color: "RANDOM",
                    fields: [
                        {
                            name: "Now Playing",
                            value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - <@!${currentTrack.requestedBy.id}>`,
                        },
                    ],
                },
            ],
        });
    },
};
