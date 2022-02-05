const { Player } = require("discord-player");
const client = require("./index.js");
const discord = require("discord.js");

const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
  spotifyBridge: false,
});


player.on("trackStart", (queue, track) => {
  queue.metadata.send(
    `🎶 | Now playing **${track.title}** Requested by __${track.requestedBy.tag}__!`
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

player.on("botDisconnect", (queue) => {
  const em = new discord.MessageEmbed()
    .setTitle("PLAYER DESTROYED AS LEFT VC")
    .setColor("RED");
  queue.metadata.send({
    embeds: [em],
  });
});

player.on("channelEmpty", (queue) => {
  const em = new discord.MessageEmbed()
    .setTitle("PLAYER DESTROYED AS CHANNEL EMPTY")
    .setColor("RED");
  queue.metadata.send({
    embeds: [em],
  });
  queue.clear();
  queue.destroy(true);
});

module.exports = player;