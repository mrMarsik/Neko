
export type TextPacket = {
  id: string
  type: 'text'
  content: string

  address: Address
  timestamp: number
}


export type AudioPacket = {
  id: string
  type: 'audio'
  audio: string
  
  address: Address
  timestamp: number
}


export type VideoPacket = {
  id: string
  type: 'video'
  video: string

  address: Address
  timestamp: number
}


export type ToolPacket = {
  id: string
  type: 'tool'
  tool: string
  data: unknown

  address: Address
  timestamp: number
}


export type Packet =
  | TextPacket
  | AudioPacket
  | VideoPacket
  | ToolPacket




export type Account = {
  id: string
  addresses: Address[]
}


export type Address = {
  platform: Platform
  userId: string
  channelId?: string | undefined
  guildId?: string
}


export type Platform =
  | 'discord'
  | 'web'
  | 'neko'
