const {
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require("discord.js");
module.exports = {
  name: "invite",
  description: "Get an invite",
  run: async (client, interaction) => {
    const emb = new MessageEmbed()
      .setTitle("Invite the discord bot")
      .setDescription("This bot was made <t:1643653800:R>")
      .addField("Link -", "[Click to invite bot]()")
      .setColor("00FFFF");

    const btn = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('Click to invite')
      )
    interaction.followUp({ embeds: [emb], components: [btn] });
  },
};
