const client = require("../index.js");

client.on('ready', (msg) => {
  console.log(`SMH ready as - ${client.user.tag}`)
  client.user.setStatus('idle')
  client.user.setActivity('new logo ✨', { type: 'WATCHING' });
  require('../web.js')(client)
})