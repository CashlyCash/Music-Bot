const {Client,Intents, Collection} = require("discord.js");

const client = new Client({
	intents: [
		"GUILDS",
		"GUILD_MEMBERS",
		"GUILD_VOICE_STATES",
		"GUILD_MESSAGES"
	],
});

process.on('unhandledRejection', error => {
	if(client.channels.cache.get("938037881098874880")){
		client.channels.cache.get("938037881098874880").send(error)
	} else {
		console.log(error)
	}
});


client.control = new Collection()
client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();

require('./handler')(client);

module.exports = client

client.login("OTEyNTM4NDAyODg3NDQ2NTI4.YZxZnQ.uo7Ezg5QVi6Htj3fNPu0Xum1_oA")