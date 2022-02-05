const player = require("../../music");
const sendLyrics = require('../../functions/lyrics')
module.exports = {
    ephemeral: true,
    name: "lyrics",
    description: "display lyrics for the current song or a specific song",
    options: [
        {
            name: "title",
            description: "specific song for lyrics",
            type: "STRING",
            required: false
        }
    ],
    run: async (client, interaction) => {
        const title = interaction.options.getString("title");

        if (title) return sendLyrics(title, interaction);

        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                content: "No music is currently being played"
            });

        return interaction.followUp(await sendLyrics(queue.current.title, interaction));
    }
};
