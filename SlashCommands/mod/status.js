const types = [
    `Watching`,
    `Listening`,
    'Streaming',
    'Watching',
    'Competing'
];

const icons = [
    'Online',
    'Idle',
    'Invisible',
    'DND'
]

module.exports = {
    ephemeral: true,
    name: "status",
    description: "OWNER ONLY!",
    options: [
        {
            name: "type",
            description: "Status type",
            choices: types.map((ap) => {
                return {
                    name: ap,
                    value: ap.toUpperCase()
                }
            }),
            required: true
        },
        {
            name: "name",
            description: "Status Text",
            type: "STRING",
            required: true
        },
        {
            name: "icon",
            description: "Status Icon",
            choices: icons.map((ap) => {
                return {
                    name: ap,
                    value: ap.toLowerCase()
                }
            }),
            required: false
        },
        {
            name: "url",
            description: "Status url",
            type: "STRING",
            required: false
        }
    ],
    run: async (client, interaction) => {
        if (interaction.member.user.id != "908554250945183744") return
        const type = interaction.options.get('type').value
        const name = interaction.options.getString("name") || client.user.presence.status

        const icon = interaction.options.get('icon').value
        const url = interaction.options.getString("url")

        client.user.setPresence({ activities: [{ name, type, url }], status: icon });
    }
};
