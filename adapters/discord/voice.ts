import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  StreamType,
  VoiceConnection
} from "@discordjs/voice"

import {
  GuildMember,
  Message
} from "discord.js"

import {
  Readable
} from "node:stream"


export class DiscordVoice {
  player: AudioPlayer
  connection?: VoiceConnection


  constructor() {
    this.player =
      createAudioPlayer()
  }


  connect(message: Message) {
    const member =
      message.member as GuildMember | null


    const channel =
      member?.voice.channel


    if (!channel) {
      return
    }


    this.connection =
      joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator:
          channel.guild.voiceAdapterCreator
      })


    this.connection.subscribe(
      this.player
    )


    return this.connection
  }


  play(stream: Readable) {
    const resource =
      createAudioResource(
        stream,
        {
          inputType:
            StreamType.Arbitrary
        }
      )


    this.player.play(resource)
  }


  pause() {
    if (
      this.player.state.status ===
      AudioPlayerStatus.Paused
    ) {
      this.player.unpause()

      return
    }


    this.player.pause()
  }


  stop() {
    this.player.stop()
  }


  disconnect() {
    this.connection?.destroy()

    this.connection = undefined
  }
}