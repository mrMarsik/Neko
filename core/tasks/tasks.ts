import { randomUUID } from 'crypto'

import type * as T from '../../types'



const tasks = new Map<string, T.Task>()


export function createTask(
  context: T.ClientContext,
  // data: Record<string, unknown>,

) {
  const task: T.Task = {
  id: 'task-001',
  status: 'pending',

  context: context,

  data: {
    query: 'назва пісні'
  },

  steps: [],

  updated: []
}


  tasks.set(task.id, task)

  return task
}

export function getTask(id: string) {
  return tasks.get(id)
}


export function updateTask(resultPacket: T.ResultPacket) {
  const task = tasks.get(resultPacket.taskId)

  if (!task) return

  if (!resultPacket.success) return
  

  task.updated.push(Date.now())

  return task
}