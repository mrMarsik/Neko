import express from 'express'
import path from 'path'
import { randomUUID } from 'crypto'
import { WebSocketServer, WebSocket } from 'ws'
import type { Server } from 'http'

import type { Packet, TextPacket } from '../types'


const app = express()

let server: Server

let bridge: WebSocket | null = null
let browser: WebSocket | null = null


function start() {
  const webPath = path.join(process.cwd(), 'web')

  app.use(express.static(webPath))


  server = app.listen(2002, () => {
    console.log('http://localhost:2002')
  })


  const socket = new WebSocketServer({
    server
  })


  socket.on('connection', (client, request) => {
    if (request.url === '/bridge') {
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

      return
    }


    if (request.url === '/web') {
      browser = client

      console.log('→ Browser')


      client.on('message', message => {
        const packet: TextPacket = {
          id: randomUUID(),
          type: 'text',

          address: {
            platform: 'web',
            userId: 'web-user',
            channelId: 'web-chat'
          },

          content: message.toString(),
          timestamp: Date.now()
        }

        send(packet)
      })


      client.on('close', () => {
        if (browser === client) {
          browser = null
        }
      })

      return
    }
  })
}


function receive(packet: Packet) {
  console.log('←', packet)

  if (packet.type !== 'text') return
  if (browser?.readyState !== WebSocket.OPEN) return

  browser.send(packet.content)
}


function send(packet: Packet) {
  if (bridge?.readyState !== WebSocket.OPEN) return

  bridge.send(JSON.stringify(packet))
}


start()