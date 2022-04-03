const fetch = require('node-fetch')
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = async (ip) => {
  const re = await fetch(`https://mcapi.us/server/status?ip=${ip}`)
  const res = await re.json()
  var emb = null
  const btn = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("REFRESH")
      .setCustomId(`upd ${ip}`)
      .setStyle("PRIMARY")
  );
  if (res.online) {
    emb = new MessageEmbed()
      .setTitle(`Server Info - ${ip}`)
      .setDescription(
        `\`\`\`${res.motd}\`\`\``
      )
      .addField(
        "Online Players -",
        `[${res.players.now}/${res.players.max }]\n\`\`\`${res.players.sample[0] ? await res.players.sample
          .map((p, i) => {
            return `${i + 1}) ${p.name}\n`;
          }).join("") : "NO PLAYERS ONLINE\n"}\`\`\``
      )
      .setThumbnail(`https://api.mcsrvstat.us/icon/${ip}`)
      .addField("Last Updated -",`<t:${res.last_updated}:R>`)
      .setColor("GREEN");
  } else {
    emb = new MessageEmbed()
      .setTitle(`Server offline - ${ip}`)
      .setColor("RED")
      .setDescription(`**Last Updated -**\n<t:${res.last_updated}:R>`)
  }
  return ({ embeds: [emb], components: [btn] });
};
