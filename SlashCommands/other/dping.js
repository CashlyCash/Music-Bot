const {
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require("discord.js");
module.exports = {
  name: "dping",
  description: "Ping a java minecraft server",
  options: [
        {
            name: "query",
            description: "Ip of the server with the port",
            type: "STRING",
            required: true,
        },
    ],
  run: async (client, interaction) => {
    const ip = await interaction.options.getString("query");
    interaction.followUp(await require('../../functions/fetch')(ip));
  },
};
