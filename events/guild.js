const client = require("../index.js");

client.on("guildCreate", (g) => {
  g.commands.set(client.slashCommands).catch((e) => {return;});
})