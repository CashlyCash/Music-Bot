

const express = require('express')
const Topgg = require('@top-gg/sdk')

const app = express() // Your express app

const webhook = new Topgg.Webhook('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxMjUzODQwMjg4NzQ0NjUyOCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjQ3MzI2MzAxfQ.nRluNOTTtmhiMTzjYoj01gjAq_Zg4Q9gmUvYrkHCmCA')

app.post('/dblwebhook', webhook.listener(vote => {
  // vote is your vote object
  console.log(vote.user) // 221221226561929217
})) // attach the middleware

app.listen(3000) // your port