import { startPort, sendPort } from './port'
import { startClient, sendClient } from './client'
import { playAudio } from './tools/play-audio'

import type * as T from '../types'


function start() {
  startPort(portReceive)
  startClient(clientReceive)
}


function clientReceive(clientPacket: T.Packet) {
  
  sendPort(clientPacket)
}


function portReceive(bridgePacket: T.Packet) {
  switch (bridgePacket.type) {
    case 'message':
      handleMessage(bridgePacket)
      break

    case 'voice':
      handleVoice(bridgePacket)
      break

    // case 'video':
    //   handleVideo(bridgePacket)
    //   break

    case 'tool':
      handleTool(bridgePacket)
      break
  }
}


function handleMessage(bridgePacket: T.MessagePacket) {
  sendClient(bridgePacket)
  console.log(bridgePacket.content)
}


function handleVoice(bridgePacket: T.VoicePacket) {
  
}



function handleTool(bridgePacket: T.ToolPacket) {

}


start()