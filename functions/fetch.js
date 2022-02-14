const fetch = require('node-fetch')
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = async (ip) => {
  const res = await (
    await fetch(`https://api.mcsrvstat.us/2/${ip}`)
  ).json();
  const btn = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("REFRESH")
      .setCustomId("upd")
      .setStyle("PRIMARY")
  );
  if (res.online.toString() == "true") {
    const emb = await new MessageEmbed()
      .setTitle("Server Info")
      .setDescription(
        `**IP : **__${res.ip + `:` + res.port}__\n**VERSION : **__${
          res.version
        }__`
      )
      .addField(
        'Description -',
        res.motd.clean
      )
      .addField(
        "Online Players -",
        `[${res.players.online}/${res.players.max }]\n\`\`\`${res.players.list ? await res.players.list
          .map((p, i) => {
            return `${i + 1}) ${p}\n`;
          })
          .join("") : 'No Online Players'}\`\`\``
      )
      .addField(
        'Protocol -',
        res.protocol.toString()
      )
      .addField(
        'Debug Info -',
        `Animated Description - ${res.debug.animatedmotd}
        Cache time - ${res.debug.cachetime}`
      )
      .setThumbnail(`https://api.mcsrvstat.us/icon/${ip}`)
      .setColor("GREEN");
    return ({ embeds: [emb], components: [btn] });
  } else {
    const emb = await new MessageEmbed()
      .setTitle("Server Offline")
      .setDescription(`**IP : **__${res.ip + `:` + res.port}__`)
      .setThumbnail(`https://api.mcsrvstat.us/icon/${ip}`)
      .setColor("RED");
    return ({ embeds: [emb], components: [btn] });
  }
};
