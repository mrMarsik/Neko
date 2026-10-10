export type Platform =
  | 'discord'
  | 'web'


export type Service =
  | 'neko'
  | 'finder'
  | 'lumen'


export type ClientContext = {
  id: string

  platform: Platform

  userId: string
  channelId: string
  guildId?: string
}


export type TextPacket = {
  id: string
  type: 'text'

  from: Service | Platform
  to: Service | Platform

  taskId: string

  content: string

  timestamp: number
}


export type AudioPacket = {
  id: string
  type: 'audio'

  from: Service
  to: Service

  taskId: string

  mediaId: string

  timestamp: number
}


export type VideoPacket = {
  id: string
  type: 'video'

  from: Service
  to: Service

  taskId: string

  mediaId: string

  timestamp: number
}


export type ToolAction =
  | 'call'
  | 'result'
  | 'error'


export type ToolPacket = {
  id: string
  type: 'tool'

  from: Service
  to: Service

  tool: string
  action: ToolAction
  
  data: Record<string, unknown>

  taskId: string
  replyTo?: string

  timestamp: number
}


export type Packet =
  | TextPacket
  | AudioPacket
  | VideoPacket
  | ToolPacket




  export type TaskStatus =
  | 'pending'
  | 'running'
  | 'done'
  | 'error'


export type ClientPacket =
  | TextPacket
  | AudioPacket
  | VideoPacket


export type Task = {
  id: string

  status: TaskStatus

  packet: ClientPacket

  data: Record<string, unknown>

  createdAt: number
  updatedAt: number
}