import 'dotenv/config'

import {
  Client,
  Events,
  GatewayIntentBits
} from 'discord.js'


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
})


function start() {
  client.once(Events.ClientReady, client => {
    console.log(`Discord: ${client.user.tag}`)
  })


  client.on(Events.MessageCreate, message => {
    if (message.author.bot) return

    console.log(message.content)
  })


  client.login(process.env.DISCORD_TOKEN)
}


start()