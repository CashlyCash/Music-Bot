const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "steal",
  run: async (client, message, args) => {
    try {
      var gfrom = client.guilds.cache.get(args[0]);
      var gto = message.guild;

      var success = 0;
      var failed = 0;

      gfrom.emojis.cache.forEach((e) => {
        try {
          gto.emojis.create(e.url, e.name);
          success++;
        } catch (e) {
          console.log(e);
          failed++;
        }
      });

      console.log(`${success} successful\n${failed} failed`);
    } catch (err) {
      console.log(err);
    }
  },
};
