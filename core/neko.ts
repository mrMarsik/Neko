import { startPort, send } from './port'

import type { Packet, TextPacket, AudioPacket, VideoPacket, ToolPacket } from '../types'

import { randomUUID } from 'crypto'



async function receive(bridgePacket: Packet) {
  
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


function handleText(bridgePacket: TextPacket) {
  const nekoPacket: TextPacket = 
    {
      id: randomUUID(),
      type: 'text',
      address: bridgePacket.address,
      content: 'zalupa',
      timestamp: Date.now()
    }


  send(nekoPacket)   
}


function handleAudio(bridgePacket: AudioPacket) {
  const nekoPacket: TextPacket = 
    {
      id: randomUUID(),
      type: 'text',
      address: bridgePacket.address,
      content: 'zalupa',
      timestamp: Date.now()
    }


  send(nekoPacket)   
}


function handleVideo(bridgePacket: VideoPacket) {
  const nekoPacket: TextPacket = 
    {
      id: randomUUID(),
      type: 'text',
      address: bridgePacket.address,
      content: 'zalupa',
      timestamp: Date.now()
    }


  send(nekoPacket)   
}


function handleTool(bridgePacket: ToolPacket) {
  console.log(bridgePacket)
}


startPort(receive)