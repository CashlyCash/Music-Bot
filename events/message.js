const client = require("../index.js");
const { Webhook } = require("discord-webhook.js")

client.on('messageCreate', async (message) => {
  if (message.content.includes('Bablu_Bhai.gif')){
    message.delete()
  }
})

client.on("messageCreate", async (message) => {
	if (message.author.bot) return;
	let msg = message.content
	let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g)
	if (!emojis) return;
	emojis.forEach(m => {
		let emoji = client.emojis.cache.find(x => x.name === m)
		if (!emoji) return;
		let temp = emoji.toString()
		if (new RegExp(temp, "g").test(msg)) msg = msg.replace(new RegExp(temp, "g"), emoji.toString())
		else msg = msg.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
	})
	if (msg === message.content) return;
	let webhook = await message.channel.fetchWebhooks();
	webhook = webhook.find(x => x.name === "NQN");
	if (!webhook) {
		webhook = await message.channel.createWebhook(`NQN`);
	}
	const hook = new Webhook(webhook.url)
	hook.setUsername(message.author.username)
	hook.setAvatar(message.author.avatarURL())
	hook.send(msg)
	message.delete().catch(err => { })
})
