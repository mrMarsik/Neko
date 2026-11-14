import type { Command } from "../types"

const playMusic: Command = {
  name: 'playMusic',
  
  steps: [
    {
      id: 'find',
      to: 'finder',
      tool: 'findAudio',
      input: { query: 'data.query' },
      output: 'url',
      status: 'pending'
    }, 
    {
      id: 'save',
      to: 'lumen',
      tool: 'saveMedia',
      input: { url: 'data.url' }, 
      output: 'mediaUrl',
      status: 'pending'
    },
    // {
    //   id: 'join',
    //   to: 'discord',
    //   tool: 'joinVoice',
    //   input: { channelId: 'context.voiceChannelId' },
    //   status: 'pending'
    // },
    {
      id: 'play',
      to: 'discord',
      tool: 'playAudio',
      input: {  
        mediaUrl: 'data.mediaUrl',  
        context: 'context'
      },
      status: 'pending'
    }
  ]
}

// TODO output

export const commands = {
  playMusic: playMusic
}