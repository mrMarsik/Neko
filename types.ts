
type Platform = 'discord' | 'web'

type Service = 'neko' | 'finder' | 'lumen'


type MessagePacket = {
  type: 'message'

  content: string

  to: Platform | 'neko'

  context: {
    platform: Platform
    channelId: string
    userId?: string
  }

  timestamp: number
}


type VoicePacket = {
  type: 'voice'

  link: string

  
  to: Platform

  context: {
    channelId: string
    userId?: string
  }

  timestamp: number
}


type ToolPacket = {
  type: 'tool'

  to: Platform | Service

  tool: string
  data: Record<string, unknown>
  context?: ClientContext

  taskId: string
  stepId: string

  timestamp: number
}


type ResultPacket = {
  type: 'result'

  to: Platform | Service

  taskId: string
  stepId: string

  success: boolean
  data: Record<string, unknown>

  timestamp: number
}


type Packet =
  | MessagePacket
  | VoicePacket
  | ToolPacket
  | ResultPacket


type Task = {
  id: string
  status: 'pending' | 'running' | 'done' | 'error'
  context: ClientContext
  data: Record<string, unknown>
  steps: Step[]
  updated: number[]
}

type Step = {
  id: string
  to: Platform | Service
  tool: string
  input: Record<string, string>
  output?:  string

  status: 'pending' | 'running' | 'done' | 'error'
}


export type ClientContext = {
  platform: 'discord' | 'web'
  userId?: string
  channelId: string
  voiceChannelId?: string
}


type Command = {
  name: string
  steps: Step[]
}

export type {
  Platform,
  Service,
  MessagePacket,
  VoicePacket,
  ToolPacket,
  ResultPacket,
  Packet,
  Step,
  Task,
  Command,
}
