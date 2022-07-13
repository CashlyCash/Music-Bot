const {Client,Intents, Collection} = require("discord.js");
const { DiscordTogether } = require('discord-together');

const client = new Client({
	intents: [
		"GUILDS",
		"GUILD_MEMBERS",
		"GUILD_BANS",
		"GUILD_INTEGRATIONS",
		"GUILD_WEBHOOKS",
		"GUILD_INVITES",
		"GUILD_VOICE_STATES",
		"GUILD_PRESENCES",
		"GUILD_MESSAGES",
		"GUILD_MESSAGE_REACTIONS",
		"GUILD_MESSAGE_TYPING",
		"DIRECT_MESSAGES",
		"DIRECT_MESSAGE_REACTIONS",
		"DIRECT_MESSAGE_TYPING",
	], 
    partials: ["CHANNEL"]
});

process.on('unhandledRejection',console.log);

client.discordTogether = new DiscordTogether(client);
client.control = new Collection()
client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();

require('./handler')(client);

module.exports = client


client.login("token")
