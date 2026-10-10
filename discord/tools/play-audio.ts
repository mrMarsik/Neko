import {
  AudioPlayerStatus,
  VoiceConnectionStatus,
  createAudioPlayer,
  createAudioResource,
  entersState,
  joinVoiceChannel
} from '@discordjs/voice'

import { client } from '../client'

import type { Address } from '../../types'


export async function playAudio(
  address: Address,
  filePath: string
) {
  if (!address.guildId) return


  const guild = await client.guilds.fetch(
    address.guildId
  )

  const member = await guild.members.fetch(
    address.userId
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
    filePath
  )


  connection.subscribe(player)

  player.play(resource)


  player.once(AudioPlayerStatus.Idle, () => {
    
  })
}