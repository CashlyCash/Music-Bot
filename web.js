const express = require("express");
const Topgg = require("@top-gg/sdk");
const { AutoPoster } = require('topgg-autoposter')
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require('node-fetch')
const fs = require('fs')
const app = express();
const path = require('path')

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxMjUzODQwMjg4NzQ0NjUyOCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjQ3MzI2MzAxfQ.nRluNOTTtmhiMTzjYoj01gjAq_Zg4Q9gmUvYrkHCmCA"

const webhook = new Topgg.Webhook(token);

async function keepAlive(client) {
  
  AutoPoster(token, client)

  app.use(express.static(__dirname + '/website'))
  
  app.get('/api/info', (req, res) => {
    res.send(client)
  })
  
  app.post(
    "/dblwebhook",
    webhook.listener((vote) => {
      const person = client.users.cache.get(vote.user);
      if (person) {
        person.send("`Thanks for voting on top.gg ❤`");
        setTimeout(() => {
          const btn = new MessageActionRow().setComponents(
        new MessageButton()
          .setLabel("Click to vote")
          .setStyle("LINK")
          .setURL("https://top.gg/bot/912538402887446528/vote")
      );
          person.send({
            content: 'Please vote again. its been 12 hours',
            components: [btn]
          })
        }, 43200000)
      }
      const btn = new MessageActionRow().setComponents(
        new MessageButton()
          .setLabel("Click to vote")
          .setStyle("LINK")
          .setURL("https://top.gg/bot/912538402887446528/vote")
      );
      const emb = new MessageEmbed()
        .setTitle("Thanks for voting")
        .setDescription(`<@!${vote.user}>`)
        .setColor("#00ffe5")
        .setURL("https://top.gg/bot/912538402887446528/vote");
      client.channels.cache
        .get("953188808776646698")
        .send({
          content: `<@!${vote.user}>`,
          embeds: [emb],
          components: [btn],
        })
        .then((m) => m.react("❤"));
    })
  );

  app.listen("8080", () => console.log(`App listening`));
}

module.exports = keepAlive;
