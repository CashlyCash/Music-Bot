const client = require("../index.js");
const player = require("../music");
const sendLyrics = require("../functions/lyrics.js");
const { embs, devbtn } = require("../functions/controls.js");

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    const sid = interaction.customId.toString().split(":");
    const uid = interaction.customId.toString().split(" ");
    const id = interaction.customId.toString();
    if (sid[0] === "m") {
      const i = interaction;
      const queue = player.getQueue(interaction.guildId);
      const btn = i.customId.split(":")[1];
      if (!queue?.playing)
        return i.reply({
          content: "There is no music playing right now",
          ephemeral: true,
        });
      if (!interaction.member.voice.channelId)
        return i.reply({ content: "Join a VC first!", ephemeral: true });
      if (interaction.guild.me.voice.channelId) {
        if (
          interaction.guild.me.voice.channelId !==
          interaction.member.voice.channelId
        ) {
          return interaction.reply({
            content: "Sorry but you need to be in the same VC in which I am!",
            ephemeral: true,
          });
        }
      }
      if (btn == "pause") {
        queue.setPaused(true);
      } else if (btn == "resume") {
        queue.setPaused(false);
      } else if (btn == "lyrics") {
        interaction.deferUpdate({ ephemeral: true });
        interaction.followUp(await sendLyrics(queue.current.title));
      } else if (btn == "next") {
        queue.skip();
      } else if (btn == "back") {
        try {
          queue.back(); 
        } catch(e) {
          interaction.reply({
            content: "No previous track found", 
            ephemeral: true
          })
        }
      } else if (btn == "stop") {
        queue.clear();
        queue.destroy(true);
      } else if (btn == "loop_on") {
        queue.setRepeatMode(1);
      } else if (btn == "loop_off") {
        queue.setRepeatMode(0);
      } else if (btn == "shuf") {
        queue.shuffle();
      } else if (btn == "rev_on") {
        queue.setFilters({ "8D": true });
      } else if (btn == "rev_off") {
        queue.setFilters({ "8D": false });
      }
      i.update({
        embeds: embs(i),
        components: devbtn(i),
      }).catch((e) => {
        return;
      });
    } else if (uid[0] == "upd") {
      interaction.message.edit(
        await require("../functions/fetch")(uid[1])
      );
    }
  } else if (interaction.isCommand()) {
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) {
      return interaction.reply({ content: "An error has occured " });
    }
    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    await interaction.deferReply({ ephemeral: cmd.ephemeral });
    cmd.run(client, interaction, args);
  }
});
