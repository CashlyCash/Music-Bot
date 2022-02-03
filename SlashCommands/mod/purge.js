const {
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require("discord.js");
module.exports = {
  name: "purge",
  description: "Purge ",
  run: async (client, interaction) => {
    const emb = new MessageEmbed()
      .setTitle("Invite the discord bot")
      .setDescription("This bot was made <t:1643653800:R>")
      .setColor("00FFFF");

    const btn = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('Click to invite')
          .setStyle('LINK')
          .setURL('https://discord.com/oauth2/authorize?client_id=912538402887446528&scope=applications.commands%20bot&permissions=1099511627775')
      )
    interaction.followUp({ embeds: [emb], components: [btn] });
  },
};
