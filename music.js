const { Player } = require("discord-player");
const client = require("./index.js");

const player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
    },
    spotifyBridge: false
});

module.exports = player;

player.on("trackStart", (queue, track) => {
  queue.metadata.send(`🎶 | Now playing **${track.title}** Requested by __${track.requestedBy.tag}__!`)
})