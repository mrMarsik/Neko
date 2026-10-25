
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
  to: Platform

  timestamp: number
}


type Packet =
  | MessagePacket
  | VoicePacket
  | ToolPacket


export type {
  Platform,
  Service,
  MessagePacket,
  VoicePacket,
  ToolPacket,
  Packet
}
