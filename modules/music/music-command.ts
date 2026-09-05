import { Message } from "discord.js"

import { Music } from "./music"

import { DiscordChat } from "../../adapters/discord/chat"
import { DiscordVoice } from "../../adapters/discord/voice"


export class MusicCommand {
  music: Music
  chat: DiscordChat
  voice: DiscordVoice


  constructor() {
    this.music = new Music()
    this.chat = new DiscordChat()
    this.voice = new DiscordVoice()
  }


  async run(message: Message) {
    const query =
      message.content.slice(2).trim()


    if (!query) {
      await this.chat.reply(
        message,
        "name"
      )

      return
    }


    const connection =
      this.voice.connect(message)


    if (!connection) {
      await this.chat.reply(
        message,
        "voice"
      )

      return
    }


    await this.music.search(query)

    const song =
      this.music.select(0)


    if (!song) {
      await this.chat.reply(
        message,
        "not found"
      )

      return
    }


    const stream =
      this.music.createStream(song)


    this.voice.play(stream)


    await this.chat.send(
      message,
      `🎵 ${song.title}`
    )
  }
}