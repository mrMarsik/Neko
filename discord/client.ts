import 'dotenv/config'

import { randomUUID } from 'crypto'
import {
  Client,
  Events,
  GatewayIntentBits
} from 'discord.js'

import type {
  Packet,
  TextPacket
} from '../types'


export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
})


export function startClient(receive: (packet: Packet) => void) {
  client.on(Events.MessageCreate, message => {
    if (message.author.bot) return

    const packet: TextPacket = {
      id: randomUUID(),
      type: 'text',
      content: message.content,

      address: {
        platform: 'discord',
        userId: message.author.id,
        channelId: message.channel.id,
        guildId: message.guildId ?? undefined
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


export async function sendClient(packet: TextPacket) {


  if (!packet.address.channelId) return

  const channel = await client.channels.fetch(
    packet.address.channelId
  )


  if (!channel?.isSendable()) return

  await channel.send(packet.content)
}