export type Platform =
  | "discord"
  | "telegram"
  | "web"



export type TextPacket = {
  id: string
  type: 'text'
  author: 'user' | 'neko'
  content: string
  timestamp: number
}


export type AudioPacket = {
  id: string
  type: 'audio'
  author: 'user' | 'neko'
  audio: string
  timestamp: number
}


export type VideoPacket = {
  id: string
  type: 'video'
  author: 'user' | 'neko'
  video: string
  timestamp: number
}


export type ToolPacket = {
  id: string
  type: 'tool'
  tool: string
  data: unknown
  timestamp: number
}


export type Packet =
  | TextPacket
  | AudioPacket
  | VideoPacket
  | ToolPacket