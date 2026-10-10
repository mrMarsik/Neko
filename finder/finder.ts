import { startPort, send } from './port'

import type { Packet, TextPacket, AudioPacket, VideoPacket, ToolPacket } from '../types'

import { randomUUID } from 'crypto'

import { tools } from './tools/n'

function receive(bridgePacket: Packet) {
  
  switch (bridgePacket.type) {
    case 'text': 
      handleText(bridgePacket)
      break;
      
    case 'audio': 
      handleAudio(bridgePacket)
      break;

    case 'video': 
      handleVideo(bridgePacket)
      break;

    case 'tool': 
      handleTool(bridgePacket)
      break;

    default:

      break;
  }
}


async function handleText(bridgePacket: TextPacket) {

}


function handleAudio(bridgePacket: AudioPacket) {
  console.log('AUDIO')
}


function handleVideo(bridgePacket: VideoPacket) {
  console.log('VIDEO') 
}


async function handleTool(bridgePacket: ToolPacket) {
  console.log('TOOL')

  const query = bridgePacket.data.query

  if (typeof query !== 'string') return

  const url = await tools.findAudio(query)  

  if (!url) return




  const finderPacket: TextPacket = {
  id: randomUUID(),
  type: 'text',

  from: 'finder',
  to: 'neko',

  taskId: bridgePacket.taskId,

  content: url,

  timestamp: Date.now()
}


  send(finderPacket)
}


startPort(receive)