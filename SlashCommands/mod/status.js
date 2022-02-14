const types = [
    `PLAYING`,
    `STREAMING`,
    'LISTENING',
    'WATCHING',
    'COMPETING'
];

const icons = [
    'online',
    'idle',
    'offline',
    'dnd'
]

module.exports = {
    ephemeral: true,
    name: "status",
    description: "OWNER ONLY!",
    options: [ 
        {
            type: 3,
            name: "type",
            description: "Status type",
            choices: types.map(type => {
                return {
                    name: type,
                    value: type
                }
            }),
            required: true
        },
        {
            type: 3,
            name: "name",
            description: "Status Text",
            type: "STRING",
            required: true
        },
        {
            type: 3,
            name: "icon",
            description: "Status Icon",
            choices: icons.map(ic => {
                return {
                    name: ic,
                    value: ic
                }
            }),
            required: false
        },
        {
            type: 3,
            name: "url",
            description: "Status url",
            type: "STRING",
            required: false
        },
    ],
    run: async (client, interaction) => {
        if (interaction.member.user.id != "908554250945183744") return
        const type = interaction.options.get('type').value
        const name = interaction.options.getString("name")
        const icon = interaction.options.get('icon') ? interaction.options.get('icon').value : client.user.presence.status
        const url = interaction.options.getString("url")
        await client.user.setPresence({ activities: [{ name, type, url }], status: icon.toLowerCase() })
        interaction.followUp(JSON.stringify({type, name, icon, url}))
    }
};
