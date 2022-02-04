const {Client,Intents, Collection} = require("discord.js");
const token = require('./token.json').token

const client = new Client({
	intents: [
		"GUILDS",
		"GUILD_MEMBERS",
		"GUILD_VOICE_STATES",
		"GUILD_MESSAGES"
	],
});

process.on('unhandledRejection', error => {
	console.log(error)
});


client.control = new Collection()
client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();

require('./handler')(client);

module.exports = client

client.login(token)