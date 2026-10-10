import WebSocket, { WebSocketServer } from 'ws'

import type { Packet } from '../types'


let bridge: WebSocket | null = null

const socket = new WebSocketServer({
  port: 2004
})


export function startPort(
  receive: (packet: Packet) => void
) {
  console.log('ws://localhost:2004')

  socket.on('connection', client => {
    bridge = client

    console.log('→ bridge')

    client.on('message', message => {
      const packet: Packet = JSON.parse(
        message.toString()
      )

      receive(packet)
    })

    client.on('close', () => {
      if (bridge === client) {
        bridge = null
      }
    })
  })
}


export function sendLight(packet: Packet) {
  if (bridge?.readyState !== WebSocket.OPEN) return

  bridge.send(
    JSON.stringify(packet)
  )
}
