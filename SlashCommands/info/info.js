const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "info",
  description: "Get some info",
  options: [
    {
      type: 3,
      name: "of",
      description: "Whom's info do you want?",
      choices: [
        {
          name: "Bot",
          value: "bot",
        },
        {
          name: "Developer",
          value: "dev",
        },
      ],
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const option = interaction.options.get('of').value
    if(option == "bot"){
      const emb = new MessageEmbed()
        .setTitle('Bot Info!')
        .setDescription('This bot was made <t:1643653800:R>')
        .addField('Website -','[music.spectral.host](https://music.spectral.host/)')
        .addField('Maker -','Use `/info of: Developer`')
        .setColor('00FFFF')
      interaction.followUp({embeds: [emb]})
    } else {
      const emb = new MessageEmbed()
        .setTitle('Developer Info!')
        .setDescription('Hi! I am Arnav Gupta and I made this bot thats it :)')
        .addField('Website -','[Cashly_Blogs](https://cashlycash.is-a.dev/)')
        .addField('Github -','[CashlyCash](https://github.com/CashlyCash)')
        .addField('Discord -','<@!908554250945183744> | CashlyCash#6842')
        .setColor('00FFFF')
      try {
        interaction.followUp({embeds: [emb]})
      } catch (e) {
        console.log(e)
      }
    }
  }
};
