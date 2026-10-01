import 'dotenv/config'

import { randomUUID } from 'crypto'
import { WebSocket, WebSocketServer } from 'ws'
import {
  Client,
  Events,
  GatewayIntentBits
} from 'discord.js'

import type { Packet, TextPacket } from '../core/types'


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

    console.log('→ Bridge')


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
      author: message.author.id,
      content: message.content,
      timestamp: Date.now()
    }

    send(packet)

    console.log(packet)
  })


  discord.once(Events.ClientReady, client => {
    console.log(`Discord: ${client.user.tag}`)
  })


  discord.login(process.env.DISCORD_TOKEN)
}


function receive(packet: Packet) {
  console.log('←', packet)

  if (packet.type !== 'text') return

  // тут потім:
  // Discord отримав текст від Neko
  // і відправляє його в потрібний канал
}


function send(packet: Packet) {
  if (bridge?.readyState !== WebSocket.OPEN) return

  bridge.send(JSON.stringify(packet))
}


start()