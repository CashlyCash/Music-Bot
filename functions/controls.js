const player = require("../music");
const { MessageActionRow, MessageButton } = require("discord.js");

const embs = (interaction) => {
  const queue = player.getQueue(interaction.guildId);
  if (!queue?.playing) return
  const progress = queue.createProgressBar();
  const perc = queue.getPlayerTimestamp();
  const currentTrack = queue.current;
  const tracks = queue.tracks.slice(0, 10).map((m, i) => {
    return `${i + 1}. [**${m.title}**](${m.url}) - ${m.requestedBy.tag}`;
  });
  const np = {
    title: "Now Playing",
    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
    fields: [
      {
        name: "\u200b",
        value: progress,
      },
    ],
    color: "BLUE",
    footer: {
      text: `Queued by ${queue.current.requestedBy.tag}`,
    },
  };

  const q = {
    title: "Song Queue",
    description: `${tracks.join("\n")}${
      queue.tracks.length > tracks.length
        ? `\n...${
            queue.tracks.length - tracks.length === 1
              ? `${queue.tracks.length - tracks.length} more track`
              : `${queue.tracks.length - tracks.length} more tracks`
          }`
        : ""
    }`,
    color: "RED",
    fields: [
      {
        name: "Now Playing",
        value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}`,
      },
    ],
  };
  return [np, q];
};

///////////////////////////////////////
//"             BUTTONS             "//
///////////////////////////////////////

const b = {
  next: new MessageButton()
    .setLabel("Next")
    .setStyle("PRIMARY")
    .setCustomId("m:next"),
  upd: new MessageButton()
    .setLabel("Update Message")
    .setStyle("PRIMARY")
    .setCustomId("m:upd"),
  prev: new MessageButton()
    .setLabel("Previous")
    .setStyle("PRIMARY")
    .setCustomId("m:back"),
  stop: new MessageButton()
    .setLabel("Destory Player")
    .setStyle("DANGER")
    .setCustomId("m:stop"),
  lyr: new MessageButton()
    .setLabel("Lyrics")
    .setStyle("PRIMARY")
    .setCustomId("m:lyrics"),
  pause: {
    pause: new MessageButton()
      .setLabel("Pause")
      .setStyle("DANGER")
      .setCustomId("m:pause"),
    resume: new MessageButton()
      .setLabel("Resume")
      .setStyle("SUCCESS")
      .setCustomId("m:resume"),
  },
  repeat: {
    on: new MessageButton()
      .setLabel("Loop is OFF")
      .setStyle("SUCCESS")
      .setCustomId("m:loop_on"),
    off: new MessageButton()
      .setLabel("Loop is ON")
      .setStyle("DANGER")
      .setCustomId("m:loop_off"),
  },
  shuffle: new MessageButton()
    .setLabel("Shuffle Queue")
    .setStyle("SUCCESS")
    .setCustomId("m:shuf"),
  rev: {
    on: new MessageButton()
      .setLabel("8D is ON")
      .setStyle("SUCCESS")
      .setCustomId("m:rev_off"),
    off: new MessageButton()
      .setLabel("8D is OFF")
      .setStyle("DANGER")
      .setCustomId("m:rev_on"),
  },
};

const devbtn = (interaction) => {
  const queue = player.getQueue(interaction.guildId);
  if (!queue?.playing) return
  const pause = queue.connection.paused;
  const loop = queue.repeatMode;
  const rev = queue.getFiltersEnabled().includes("8D");
  const pausebtn = pause ? b.pause.resume : b.pause.pause;
  const loopbtn = loop === 0 ? b.repeat.on : b.repeat.off;
  const revbtn = rev ? b.rev.on : b.rev.off;
  var row1 = new MessageActionRow().addComponents([
    pausebtn,
    b.prev,
    b.next,
    loopbtn,
    b.stop,
  ]);
  var row2 = new MessageActionRow().addComponents([
    b.shuffle,
    revbtn,
    b.lyr,
    b.upd,
  ]);
  return [row1, row2];
};

module.exports = { embs, devbtn };
