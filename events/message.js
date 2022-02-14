const client = require("../index.js");
const { Webhook } = require("discord-webhook.js");

client.on("messageCreate", async (message) => {
    if (message.channel.type == 'DM') return
    if (message.author.bot) return;
    let msg = message.content;
    let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g);
    if (!emojis) return;
    emojis.forEach((m) => {
        let emoji = client.emojis.cache.find((x) => x.name === m);
        if (!emoji) return;
        let temp = emoji.toString();
        if (new RegExp(temp, "g").test(msg))
            msg = msg.replace(new RegExp(temp, "g"), emoji.toString());
        else msg = msg.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
    });
    if (msg === message.content) return;
    let webhook = await message.channel.fetchWebhooks();
    webhook = webhook.find((x) => x.name === "Ex-Emoji");
    if (!webhook) {
        webhook = await message.channel.createWebhook(`Ex-Emoji`);
    }
    const hook = new Webhook(webhook.url);
    message.delete().catch((err) => { });
    hook.setUsername(message.author.username);
    hook.setAvatar(message.author.avatarURL());
    hook.send(msg);
});

const hooksend = async (msg, username, avatar, message) => {
    let webhook = await message.channel.fetchWebhooks();
    webhook = webhook.find((x) => x.name === "Ex-Emoji");

    if (!webhook) {
        webhook = await message.channel.createWebhook(`Ex-Emoji`);
    }

    const hook = new Webhook(webhook.url);
    hook.setUsername(username);
    hook.setAvatar(avatar);
    hook.send(msg);
};

client.on("messageCreate", async (message) => {
    if (message.channel.type == 'DM') return
    if (message.content.includes("Bablu_Bhai.gif")) {
        // message.delete();
    }
    if (message.author.id != "908554250945183744") return;
    if (message.content == "%spank") {
        hooksend(
            "<a:panties:937923765227114506>",
            "Get spanked!",
            "https://cdn.discordapp.com/emojis/937923765227114506.gif",
            message
        );
        message.delete();
    }
    if (message.content == "%vibe") {
        hooksend(
            "<a:DJ:937922981823393813>",
            "Vibing to music",
            "https://cdn.discordapp.com/emojis/937922981823393813.gif",
            message
        );
        message.delete();
    }
});

client.on("messageCreate", async (message) => {
    if (message.channel.type == 'DM') {
        await client.channels.cache.get('938791126465396809').send({
            content: `<@!${message.author.id}> => ${message.content}`,
            files: message.attachments
        })
        return
    }
    if (message.author.bot) return;
    const prefix = 'ct!';
    var args = message.content.slice(prefix.length).trim().split(/ +/g);
    command = args.shift().toLowerCase();
    cmd =
        client.commands.get(command) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));
    if (message.content.indexOf(prefix) !== 0) return;
    if (cmd) {
        cmd.run(client, message, args, prefix);
    }
});