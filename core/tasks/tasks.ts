import { randomUUID } from 'crypto'
import { send } from '../port'
import { sendDark } from '../dark-port'
import type {Step, Task, Command, ClientContext, ResultPacket, Service, Platform, VoicePacket, ToolPacket} from "../../types"

import { text } from 'stream/consumers'
import { start } from 'repl'



const tasks = new Map<string, Task>()

export function createTask(
  command: Command,
  data: Record<string, unknown>,
  context: ClientContext
) {


  const task: Task = {
  id: randomUUID(),
  status: 'pending',

  context: context,

  data: data,

  steps: structuredClone(command.steps),

  updated: []
}


  tasks.set(task.id, task)

  return task
}

export function getTask(id: string) {
  return tasks.get(id)
}


export function updateTask(resultPacket: ResultPacket) {
  const task = tasks.get(resultPacket.taskId)
  if (!task || !resultPacket.success) return

  const step = task?.steps.find(step => step.id === resultPacket.stepId)
  if (!step) return
  if (!step.output ) return
 
  const newData: Record<string, unknown> = {}
  const elem = Object.values(resultPacket.data)[0]
  newData[step.output] = elem
  console.log(newData)

  // for (const index in step.output) {

  //   const elem = step.output[index]
  //   const [type, key] = elem.split('.')

  //   if (type !== 'data' && type !== 'context') return false

  //   const source = task[type] as Record<string, unknown>

  //   const value = resultPacket.data[0]
  //   newData[key] = value
  // }


  Object.assign(task.data, newData)

  task.updated.push(Date.now())


  runTask(task.id)

  return task
}


export function runTask(taskId: string) {
  
  const task = getTask(taskId)

  if (!task) return
  
  for (const step of task.steps) {
    if (step.status === 'done') continue

    
    if (!keineAhnung(step, task)) {
      continue
    }

    
    const data: Record<string, unknown> = step.input

    for (const index in step.input) {
      if (index === 'context') {
        data.context = task.context
        continue
      }
      const elem = step.input[index]
      const [type, key] = elem.split('.')

      if (type !== 'data' && type !== 'context') return false

      const source = task[type] as Record<string, unknown>

      const value = source[key]
      data[key] = value
    }



    const packet : ToolPacket = {
      type: 'tool',

      to: step.to,

      tool: step.tool,
      data: data,
      context: task.context,
      taskId: task.id,
      stepId: step.id,

      timestamp: Date.now()
    }


    switch (packet.to) {
      default:
        sendDark(packet)
        step.status = 'done'
        break;

      case 'discord':
        send(packet)
                step.status = 'done'

        break;
    
    }
  }

}


function keineAhnung(
  step: Step,
  task: Task
): boolean {
  for (const input of Object.values(step.input)) {
    if (input === 'context') continue
    const [type, key] = input.split('.')

    if (type !== 'data' && type !== 'context') return false

    const source = task[type] as Record<string, unknown>

    if (source[key] === undefined) return false
  }

  return true
}




