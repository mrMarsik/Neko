import { Message } from "discord.js"

import {
  joinVoiceChannel,
  entersState,
  VoiceConnectionStatus,
  VoiceConnection,
  createAudioPlayer,
  AudioPlayer
} from "@discordjs/voice"


export class Initializer {
  message: Message
  audioPlayer: AudioPlayer


  constructor(message: Message) {
    this.message = message
    this.audioPlayer = createAudioPlayer()
  }


  checkVoice() {
    return this.message.member?.voice.channel ?? null
  }


  async connectVoice(): Promise<VoiceConnection | null> {
    const channel = this.checkVoice()

    if (!channel) {
      return null
    }


    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator
    })


    await entersState(
      connection,
      VoiceConnectionStatus.Ready,
      30_000
    )


    return connection
  }


  getAudioPlayer() {
    return this.audioPlayer
  }
}