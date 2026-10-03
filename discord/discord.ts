import { startPort, sendPort } from './port'
import { startClient, sendClient } from './client'

import type {
  Packet,
  TextPacket,
  AudioPacket,
  VideoPacket,
  ToolPacket
} from '../types'


function start() {
  startPort(portReceive)
  startClient(clientReceive)
}


function clientReceive(clientPacket: Packet) {
  sendPort(clientPacket)
}


function portReceive(bridgePacket: Packet) {
  switch (bridgePacket.type) {
    case 'text':
      handleText(bridgePacket)
      break

    case 'audio':
      handleAudio(bridgePacket)
      break

    case 'video':
      handleVideo(bridgePacket)
      break

    case 'tool':
      handleTool(bridgePacket)
      break
  }
}


function handleText(bridgePacket: TextPacket) {
  sendClient(bridgePacket)
}


function handleAudio(bridgePacket: AudioPacket) {

}


function handleVideo(bridgePacket: VideoPacket) {

}


function handleTool(bridgePacket: ToolPacket) {

}


start()