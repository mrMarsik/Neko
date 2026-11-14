import { startPort, send } from './port'

import type { Packet, ToolPacket, ResultPacket } from '../types'

import { randomUUID } from 'crypto'

import { tools } from './tools/n'

function receive(bridgePacket: Packet) {
  
  switch (bridgePacket.type) {
  
    case 'tool': 
      handleTool(bridgePacket)
      break;

    default:

      break;
  }
}



async function handleTool(bridgePacket: ToolPacket) {
  console.log(bridgePacket.tool + ': ' + bridgePacket.data.query)


  const query = bridgePacket.data.query

  if (typeof query !== 'string') return

  const url = await tools.findAudio(query)  

  if (!url) return

  console.log(url)
  

  const resultPacket: ResultPacket = {
    type: 'result',

    to: 'neko',

    taskId: bridgePacket.taskId,
    stepId: bridgePacket.stepId,
    success: true,
    data: { url: url },
    
    timestamp: Date.now()
  }

  send(resultPacket)
}


startPort(receive)