import { randomUUID } from 'crypto'

import { startPort, send } from './port'
import { startDarkPort, sendDark } from './dark-port'


import { getTask, createTask, updateTask } from './tasks/tasks'

import { tools } from './tools/n'

import type { Packet, TextPacket, AudioPacket, VideoPacket, ToolPacket } from '../types'


function receive(clientPacket: Packet) {
  
  switch (clientPacket.type) {
    case 'text': 
      handText(clientPacket)
      break;
      
    case 'audio': 
      handAudio(clientPacket)
      break;

    case 'video': 
      handVideo(clientPacket)
      break;

    case 'tool': 
      handTool(clientPacket)
      break;

    default:

      break;
  }
}
function handText(clientPacket: TextPacket) {

  console.log(clientPacket.content)

  const newTask = createTask(clientPacket)
  
  console.log(newTask)

}


function handAudio(bridgePacket: AudioPacket) {
  console.log(bridgePacket)  
}


function handVideo(bridgePacket: VideoPacket) {
  console.log(bridgePacket)  
}


function handTool(bridgePacket: ToolPacket) {
  console.log(bridgePacket)
}




function darkReceive(bridgePacket: Packet) {
  
  switch (bridgePacket.type) {
    case 'text': 
      darkHandText(bridgePacket)
      break;
      
    case 'audio': 
      darkHandAudio(bridgePacket)
      break;

    case 'video': 
      darkHandVideo(bridgePacket)
      break;

    case 'tool': 
      darkHandTool(bridgePacket)
      break;

    default:

      break;
  }
}

function darkHandText(bridgePacket: TextPacket) {
  console.log('dark')

  console.log(bridgePacket.content)
  console.log(getTask(bridgePacket.taskId))
  
}


function darkHandAudio(bridgePacket: AudioPacket) {
  console.log(bridgePacket)  
}


function darkHandVideo(bridgePacket: VideoPacket) {
  console.log(bridgePacket)  
}


function darkHandTool(bridgePacket: ToolPacket) {
  console.log(bridgePacket)
}


startPort(receive)
startDarkPort(darkReceive)
