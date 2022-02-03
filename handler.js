const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const globPromise = promisify(glob);

module.exports = async (client) => {
  //Slash Command Hanlder
  const slashCommands = await globPromise(
    `${process.cwd()}/SlashCommands/*/*.js`
  );
  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);
    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
  });
  client.on("ready", async () => {
    await client.guilds.cache.forEach((g) => {
      g.commands.set(arrayOfSlashCommands).catch((e) => {
        return;
      });
    });
    await client.application.commands.set([]);
  });
  client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
      await interaction.deferReply({ ephemeral: false }).catch(() => {});

      const cmd = client.slashCommands.get(interaction.commandName);
      if (!cmd)
        return interaction.followUp({ content: "An error has occured " });

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

      cmd.run(client, interaction, args);
    }

    if (interaction.isContextMenu()) {
      await interaction.deferReply({ ephemeral: false });
      const command = client.slashCommands.get(interaction.commandName);
      if (command) command.run(client, interaction);
    }
  });

  //Command Handler
  const commandfiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  commandfiles.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = {
        directory,
        ...file,
      };
      client.commands.set(file.name, properties);
    }
    if (file.aliases && Array.isArray(file.aliases)) {
      file.aliases.forEach((alias) => client.aliases.set(alias, file.name));
    }
  });

  //Event Handler
  const eventfiles = await globPromise(`${process.cwd()}/events/*.js`);
  eventfiles.map((value) => require(value)); // Now lets add a prefix
};
