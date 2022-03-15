const player = require("../../music");
const sendLyrics = require('../../functions/lyrics')
module.exports = {
    ephemeral: true,
    name: "jump",
    description: "display lyrics for the current song or a specific song",
    options: [
        {
            name: "number",
            description: "number of song from the queue to jump on",
            type: "INTEGER",
            required: true
        }
    ],
    run: async (client, interaction) => {
        const no = interaction.options.getInteger("number");
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                content: "No music is currently being played"
            });
  
        queue.jump(no);
        interaction.followUp('DONE! Jumped to `' + no + '`')
    }
};
