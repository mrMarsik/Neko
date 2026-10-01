import express from 'express'
import path from 'path'
import { WebSocketServer, WebSocket } from 'ws'
import type { Server } from 'http'

import type { Packet } from '../core/types'


const app = express()

let server: Server
let bridge: WebSocket | null = null


function start() {
  const webPath = path.join(process.cwd(), 'web')

  app.use(express.static(webPath))


  server = app.listen(2002, () => {
    console.log('http://localhost:2002')
  })


  const socket = new WebSocketServer({
    server
  })


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
}


function receive(packet: Packet) {
  console.log('←', packet)
  send(packet)
}


function send(packet: Packet) {
  if (bridge?.readyState !== WebSocket.OPEN) return

  bridge.send(JSON.stringify(packet))
}


start()