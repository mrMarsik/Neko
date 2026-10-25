import { randomUUID } from 'crypto'

import { startPort, send } from './port'
import { startDarkPort, sendDark } from './dark-port'


import { getTask, createTask, updateTask } from './tasks/tasks'

import { tools } from './tools/n'
import type * as T from '../types'



function receive(clientPacket: T.Packet) {
  
  switch (clientPacket.type) {
    case 'message': 
      handMessage(clientPacket)
      break;

      
    case 'voice': 
      handVoice(clientPacket)
      break;


    default:

      break;
  }
}


function handMessage(clientPacket: T.MessagePacket) {

  console.log(clientPacket.content)

  
  const newTask = createTask(clientPacket)
  
  const newPacket = clientPacket
  clientPacket.to = 'discord'
  newPacket.content = 'zalupa'

  send(newPacket)

}


function handVoice(bridgePacket: T.VoicePacket) {
  console.log(bridgePacket)  
}





function darkReceive(bridgePacket: T.Packet) {
  
  switch (bridgePacket.type) {
    case 'message': 
      darkHandMessage(bridgePacket)
      break;
      
    case 'voice': 
      darkHandVoice(bridgePacket)
      break;


    case 'tool': 
      darkHandTool(bridgePacket)
      break;

    default:

      break;
  }
}

function darkHandMessage(bridgePacket: T.MessagePacket) {


  console.log('dark ' + bridgePacket.content)

  
}


function darkHandVoice(bridgePacket: T.VoicePacket) {
  console.log(bridgePacket)  
}


function darkHandTool(bridgePacket: T.ToolPacket) {
  console.log(bridgePacket)
}


startPort(receive)
startDarkPort(darkReceive)
