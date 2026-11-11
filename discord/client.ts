import 'dotenv/config'

import { randomUUID } from 'crypto'
import {
  Client,
  Events,
  GatewayIntentBits
} from 'discord.js'

import type * as T from '../types'

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
})


export function startClient(receive: (packet: T.Packet) => void) {
  client.on(Events.MessageCreate, message => {
    
    if (message.author.bot) return


    const packet: T.MessagePacket = {
      type: 'message',

      content: message.content,

      to: 'neko',

      context: {
        platform: 'discord',
        channelId: message.channel.id,
        userId: message.author.id
      },

      timestamp: Date.now()
    }

    receive(packet)
  })


  client.once(Events.ClientReady, readyClient => {
    console.log(`Discord: ${readyClient.user.tag}`)
  })


  client.login(process.env.DISCORD_TOKEN)
}


export async function sendClient(packet: T.MessagePacket) {


  if (!packet.context.channelId) return

  const channel = await client.channels.fetch(
    packet.context.channelId
  )


  if (!channel?.isSendable()) return

  await channel.send(packet.content)
}