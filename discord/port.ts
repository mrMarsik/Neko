import WebSocket, { WebSocketServer } from 'ws'

import type { Packet } from '../types'


let bridge: WebSocket | null = null

const socket = new WebSocketServer({
  port: 2003
})


export function startPort(receive: (packet: Packet) => void) {

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
}


export function sendPort(packet: Packet) {

  if (bridge?.readyState !== WebSocket.OPEN) return
  bridge.send(JSON.stringify(packet))
}