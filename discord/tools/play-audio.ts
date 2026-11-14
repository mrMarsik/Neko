import {
  AudioPlayerStatus,
  VoiceConnectionStatus,
  createAudioPlayer,
  createAudioResource,
  entersState,
  joinVoiceChannel
} from '@discordjs/voice'

import { client } from '../client'

import type { ClientContext } from '../../types'


export async function playAudio(
  data: Record<string, unknown>,
  context: ClientContext
) {

  const mediaUrl = data.mediaUrl

  if (!context.userId) return 
  if (!context.channelId) return
  if (typeof mediaUrl !== 'string') return  

  const channel = await client.channels.fetch(context.channelId)
  if (!channel || !('guild' in channel)) return

  const guild = channel.guild
  const member = await guild.members.fetch(
    context.userId
  )

  const voiceChannel = member.voice.channel
  if (!voiceChannel) return


  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator
  })


  await entersState(
    connection,
    VoiceConnectionStatus.Ready,
    15_000
  )


  const player = createAudioPlayer()

  const resource = createAudioResource(
    mediaUrl
  )


  connection.subscribe(player)

  player.play(resource)


  player.once(AudioPlayerStatus.Idle, () => {
    
  })
}