import { startPort, send } from './port'

import type { Packet } from './types'


async function receive(packet: Packet) {
  console.log(packet)
  console.log(1)

  send(packet)
}


startPort(receive)