import WebSocket from 'ws'

import type { Packet, ToolPacket } from '../types'


const addresses = {
  neko: 'ws://localhost:6660',
  finder: 'ws://localhost:6661',
  lumen: 'ws://localhost:6662',
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


function isPortName(value: string): value is PortName {
  return value in addresses
}


function route(from: PortName, packet: Packet) {

  if (packet.type === 'text') {
    console.log(packet.content)
  }

  if (packet.type === 'tool') {
    console.log(packet.tool)
  }

  const platform = packet.to

  if (isPortName(platform)) {
    send(platform, packet)
  }

  


  // neko dark → dark module
  // const platform = packet.address.platform

  // send(platform, packet)
}


function send(portName: PortName, packet: Packet) {
  const port = ports[portName]

  if (port?.readyState !== WebSocket.OPEN) return

  port.send(JSON.stringify(packet))
}


function start() {
  connect('neko')
  connect('finder')
  connect('lumen')
}


start()