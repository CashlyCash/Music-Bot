const aps = [
  "youtube",
  "youtubedev",
  "poker",
  "betrayal",
  "fishing",
  "chess",
  "chessdev",
  "lettertile",
  "wordsnack",
  "doodlecrew",
  "awkword",  
  "spellcast",
  "checkers", 
  "puttparty",
  "sketchheads"
];

module.exports = {
  name: "acitvity",
  description: "Start an activity in a VC",
  options: [
    {
      type: 3,
      name: "type",
      description: "Which activity do you want to start",
      choices: aps.map((ap) => {
        return {
          name: ap,
          value: ap
        }
      }),
      required: true,
    },
  ],
  run: async (client, interaction) => {
    if (message.member.voice.channel) {
      client.discordTogether
        .createTogetherCode(message.member.voice.channel.id, interaction.options.get('type').value)
        .then(async (invite) => {
          return message.channel.send(`${invite.code}`);
        });
    } else {
      interaction.followUp("Please join a VC (Voice Channel) first");
    }
  },
};
