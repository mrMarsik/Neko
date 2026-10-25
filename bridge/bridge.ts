import WebSocket from 'ws'

import type * as T from '../types'




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


const addresses = {
    neko: 'ws://localhost:2000',
    web: 'ws://localhost:2002',
    discord: 'ws://localhost:2003',
    lumen: 'ws://localhost:2004',
}


function isPortName(value: string): value is PortName {
  return value in addresses
}


function route(from: PortName, packet: T.Packet) {
  console.log(packet.content)


  // Neko → adapter
  const platform = packet.to
  
  if (isPortName(platform)) {
    send(platform, packet)
  }
  // send(platform, packet)
}


function send(portName: PortName, packet: T.Packet) {
  const port = ports[portName]

  if (port?.readyState !== WebSocket.OPEN) return

  port.send(JSON.stringify(packet))
}


function start() {
  connect('neko')
  connect('web')
  connect('discord')
  connect('lumen')
}


start()