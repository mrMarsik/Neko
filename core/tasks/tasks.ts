import { randomUUID } from 'crypto'

import type {
  ClientPacket,
  Task
} from '../../types'



const tasks = new Map<string, Task>()


export function createTask(
  packet: ClientPacket
) {
  const task: Task = {
    id: randomUUID(),

    status: 'running',

    packet,

    data: {},

    createdAt: Date.now(),
    updatedAt: Date.now()
  }


  tasks.set(task.id, task)

  return task
}

export function getTask(id: string) {
  return tasks.get(id)
}


export function updateTask(
  id: string,
  data: Record<string, unknown>
) {
  const task = tasks.get(id)

  if (!task) return


  task.data = {
    ...task.data,
    ...data
  }

  task.updatedAt = Date.now()

  return task
}