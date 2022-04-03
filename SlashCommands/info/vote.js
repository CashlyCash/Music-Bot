const {
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require("discord.js");
module.exports = {
  name: "vote",
  description: "Vote for Ex-Music",
  run: async (client, interaction) => {
    const emb = new MessageEmbed()
      .setTitle("Vote for this discord bot")
      .setDescription("This bot was made <t:1643653800:R>")
      .setColor("00FFFF");

    const btn = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('Click to vote')
          .setStyle('LINK')
          .setURL('https://top.gg/bot/912538402887446528/vote')
      )
    interaction.editReply({ embeds: [emb], components: [btn] });
  },
};
