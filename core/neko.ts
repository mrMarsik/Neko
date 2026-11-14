import { randomUUID } from 'crypto'

import { startPort, send } from './port'
import { startDarkPort, sendDark } from './dark-port'


import { getTask, createTask, updateTask, runTask } from './tasks/tasks'

import { commands } from './commands'
import type * as T from '../types'
import { client } from '../discord/client'



function receive(clientPacket: T.Packet) {
  
  switch (clientPacket.type) {
    case 'message': 
      handMessage(clientPacket)
      break;

    case 'voice': 
      handVoice(clientPacket)
      break;

    case 'result':
      darkHandResult(clientPacket)
      break

    default:

      break;
  }
}


function handMessage(clientPacket: T.MessagePacket) {

  if (!clientPacket.content) return

  // console.log(clientPacket)s
  const command = commands.playMusic

  const data = {
    query: clientPacket.content,
  }

  const newTask = createTask(command, data, clientPacket.context)
  console.log(newTask)

  runTask(newTask.id)

  // const newPacket = {...clientPacket}
  // newPacket.to = 'discord'

  // switch (newPacket.context.userId) {
    
  //   default:
  //     newPacket.content = 'не круто'
  //     break

  //   case '547749407957712896':
  //     newPacket.content = 'круто'
        
  // }


  // send(newPacket)



  // const toolPacket : T.ToolPacket = {
  //   taskId: '1',

  //   type: 'tool',

  //   to: 'finder',
  //   tool: 'find-audio',
  //   data: {query : clientPacket.content},

  //   timestamp: Date.now()

  // } 

  // sendDark(toolPacket)
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


     case 'result': 
      darkHandResult(bridgePacket)
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


function darkHandResult(bridgePacket: T.ResultPacket) {
  updateTask(bridgePacket)
}


startPort(receive)
startDarkPort(darkReceive)
