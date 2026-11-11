import type { Command } from "../types"

const playMusic: Command = {
  name: 'playMusic',
  
  steps: [
    {
      id: 'find',
      to: 'finder',
      tool: 'findAudio',
      input: { query: '$data.query' },
      dependsOn: []
    },
    {
      id: 'save',
      to: 'lumen',
      tool: 'saveMedia',
      input: { url: '$find.url' },
      dependsOn: ['find']
    },
    {
      id: 'join',
      to: 'discord',
      tool: 'joinVoice',
      input: { channelId: '$context.voiceChannelId' },
      dependsOn: []
    },
    {
      id: 'play',
      to: 'discord',
      tool: 'playAudio',
      input: { mediaId: '$save.mediaId' },
      dependsOn: ['save', 'join']
    }
  ]
}


export const commands = {
  playMusic: playMusic
}