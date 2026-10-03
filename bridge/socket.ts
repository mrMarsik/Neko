import WebSocket from 'ws'

import type { Packet } from '../core/types'


const addresses = {
  neko: 'ws://localhost:2000',
  web: 'ws://localhost:2002',
  discord: 'ws://localhost:2003'
}


type PortName = keyof typeof addresses


const ports: Partial<Record<PortName, WebSocket>> = {}


function connect(portName: PortName) {
  const port = new WebSocket(addresses[portName])

  ports[portName] = port


  port.on('open', () => {
    console.log(`→ ${portName}`)
  })


  port.on('message', message => {
    const packet: Packet = JSON.parse(message.toString())

    route(portName, packet)
  })


  port.on('close', () => {
    if (ports[portName] === port) {
      delete ports[portName]
    }

    setTimeout(() => connect(portName), 1000)
  })


  port.on('error', () => {
    port.close()
  })
}


function route(from: PortName, packet: Packet) {

  // adapter → Neko
  if (from !== 'neko') {
    send('neko', packet)

    return
  }


  // Neko → adapter
  const platform = packet.address.platform

  send(platform, packet)
}


function send(portName: PortName, packet: Packet) {
  const port = ports[portName]

  if (port?.readyState !== WebSocket.OPEN) return

  port.send(JSON.stringify(packet))
}


function start() {
  connect('neko')
  connect('web')
  connect('discord')
}


start()