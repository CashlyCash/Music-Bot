const player = require("../../music");
const { embs, devbtn } = require("../../functions/controls.js");
module.exports = {
  name: "control",
  description: "an interactive music control unit (ADMIN ONLY)",
  run: async (client, interaction) => {
    const queue = player.getQueue(interaction.guildId);
    if (!queue?.playing)
      return interaction.followUp({
        content: "No music is currently being played",
      });

    ///////////////////////////////////////
    //"              REPLY              "//
    ///////////////////////////////////////

    interaction.editReply({
      embeds: await embs(interaction),
      components: await devbtn(interaction),
    })
  },
};
