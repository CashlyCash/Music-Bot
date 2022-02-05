const { QueryType } = require("discord-player");
const { MessageEmbed } = require("discord.js");
const player = require("../../music");

module.exports = {
    ephemeral: true,
    name: "play",
    description: "play a song",
    options: [
        {
            name: "query",
            description: "name/link of the song/playlist",
            type: "STRING",
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const songTitle = interaction.options.getString("query");

        if (!interaction.member.voice.channel)
            return interaction.followUp({
                content: "Please join a voice channel first!",
            });

        if (interaction.guild.me.voice.channelId) {
            if (
                interaction.guild.me.voice.channelId !==
                interaction.member.voice.channelId
            ) {
                return interaction.followUp({
                    content:
                        "Sorry but the bot is being used in another channel, Ask a moderator or an admin to disconnect the bot from the vc!\nIf you think this an error please inform <@!908554250945183744>",
                });
            }
        }

        const searchResult = await player
            .search(songTitle, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            })
            .catch((err) => {
                console.log(err)
                const e = new MessageEmbed()
                    .setTitle("Error handling!")
                    .setDescription(
                        "Please see all the common errors you could have made-"
                    )
                    .addField(
                        "Spotify Podcast?",
                        `Did you spotify playlist had a podcast? Well we are sorry but we dont support spotify podcast for now.`
                    )
                    .addField(
                        "Other?",
                        "If that was not the case then please DM <@!908554250945183744> about this!"
                    );
                return interaction.followUp({
                    content: "Error!",
                    embeds: [e],
                });
            });

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel,
        });
        queue.setRepeatMode(0);

        if (!searchResult.tracks[0]) {
            return interaction.followUp('No result found :sob:')
        }

        if (!queue.connection)
            await queue.connect(interaction.member.voice.channel);

        const output = searchResult.playlist
            ? `\`\`\`${searchResult.tracks.map((t) => `${t.title}\n`)}\`\`\``
            : `\`\`\`${searchResult.tracks[0].title}\`\`\``;
        interaction.followUp({ content: `Playing ${output}` });

        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};
