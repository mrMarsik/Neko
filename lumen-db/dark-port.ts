import WebSocket, { WebSocketServer } from 'ws'

import type { Packet } from '../types'


let darkBridge: WebSocket | null = null

const socket = new WebSocketServer({
  port: 6662
})


export function startDarkPort(
  receive: (packet: Packet) => void
) {
  console.log('ws://localhost:6662')

  socket.on('connection', client => {
    darkBridge = client

    console.log('→ dark bridge')

    client.on('message', message => {
      const packet: Packet = JSON.parse(
        message.toString()
      )

      receive(packet)
    })

    client.on('close', () => {
      if (darkBridge === client) {
        darkBridge = null
      }
    })
  })
}


export function sendDark(packet: Packet) {
  if (darkBridge?.readyState !== WebSocket.OPEN) return

  darkBridge.send(
    JSON.stringify(packet)
  )
}
