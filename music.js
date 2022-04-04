const { Player } = require("discord-player");
const client = require("./index.js");
const discord = require("discord.js");
require("discord-player/smoothVolume");

const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
  spotifyBridge: false,
});


player.on("trackStart", (queue, track) => {
  queue.metadata.send(
    `🎶 | Now playing **${track.title}** Requested by __<@!${track.requestedBy.id}>__!`
  );
});

player.on("error", (queue, e) => {
  const em = new discord.MessageEmbed()
    .setTitle("Error! 😭")
    .setDescription("An error was emitted!")
    .addField("Error -", `\`PLEASE DO NOT SPAM PING\`\n${e}`)
    .setColor("RED");
  queue.metadata.send({
    embeds: [em],
  });
});

player.on("connectionError", (queue, e) => {
  const em = new discord.MessageEmbed()
    .setTitle("Error! 😭")
    .setDescription("An error was emitted!")
    .addField("Error -", `\`PLEASE DO NOT SPAM PING\`\n${e}`)
    .setColor("RED");
  queue.metadata.send({
    embeds: [em],
  });
});

client.on('voiceStateUpdate', (oldState, newState) => {
  if (oldState.member.id === client.user.id && !newState.channelId) {
    let guildQueue = player.getQueue(oldState.member.guild.id);
    if (guildQueue) {
      guildQueue.destroy();
      const em = new discord.MessageEmbed()
        .setTitle("I was disconnected")
        .setDescription("Someone kicked me from the vc.")
        .setColor("RED");
      guildQueue.metadata.send({
        embeds: [em],
      });
    }
  }/*  else if (
    newState.member.id != client.user.id && 
    oldState.member.guild.channels.cache.get(oldState.channel.id).members.size == 1 && 
    !newState.channelId) {
    let guildQueue = player.getQueue(oldState.member.guild.id);
    if (guildQueue) {     
      if (guildQueue.metadata.id != oldState.channel.id) return
      const em = new discord.MessageEmbed()
        .setTitle("Everyone left the VC")
        .setDescription("There was no one else other than me in the   VC.\nI was lonely :sob: so I left it.")
        .setColor("RED");
      guildQueue.metadata.send({
        embeds: [em],
      });
      guildQueue.destroy();
    }
  } */
});

module.exports = player;