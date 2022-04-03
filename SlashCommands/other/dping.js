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
    if (ip.includes(' ')){
      return interaction.editReply('The IP contains a SPACE ` ` which will lead to errors in the bot. Please provide a proper IP.');
    }
    
    interaction.editReply(await require('../../functions/fetch')(ip));
  },
};
