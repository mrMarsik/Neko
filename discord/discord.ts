import 'dotenv/config'

import { randomUUID } from 'crypto'
import { WebSocket, WebSocketServer } from 'ws'
import {
  Client,
  Events,
  GatewayIntentBits
} from 'discord.js'

import type { Packet, TextPacket, AudioPacket, ToolPacket, Address } from '../core/types'


const discord = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
})

const socket = new WebSocketServer({
  port: 2003
})

let bridge: WebSocket | null = null


function start() {
  console.log('ws://localhost:2003')


  socket.on('connection', client => {
    bridge = client

    console.log('→ bridge')


    client.on('message', message => {
      const packet: Packet = JSON.parse(message.toString())

      receive(packet)
    })


    client.on('close', () => {
      if (bridge === client) {
        bridge = null
      }
    })
  })


  discord.on(Events.MessageCreate, message => {
    if (message.author.bot) return

    const packet: TextPacket = {
      id: randomUUID(),
      type: 'text',
      content: message.content,

      address: {
        platform: 'discord',
        userId: message.author.id,
        channelId: message.channel.id
      },

      timestamp: Date.now()
    }

    send(packet)

    console.log('→', packet)
  })


  discord.once(Events.ClientReady, client => {
    console.log(`Discord: ${client.user.tag}`)
  })


  discord.login(process.env.DISCORD_TOKEN)
}


async function receive(packet: Packet) {
  console.log('←', packet)

  if (packet.type !== 'text') return
  if (packet.address.platform !== 'discord') return
  if (!packet.address.channelId) return

  const channel = await discord.channels.fetch(
    packet.address.channelId
  )
  
  if (!channel?.isSendable()) return
  
  await channel.send(packet.content)
}


function send(packet: Packet) {
  if (bridge?.readyState !== WebSocket.OPEN) return

  bridge.send(JSON.stringify(packet))
}


start()