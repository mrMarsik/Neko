import { Message } from "discord.js"
import { Player } from "discord-player"
import { music as replies } from "../../replies"
import { spawn } from "node:child_process"

import {
  joinVoiceChannel,
  entersState,
  VoiceConnectionStatus,
  createAudioPlayer,
  createAudioResource,
  StreamType
} from "@discordjs/voice"

import { Renderer } from "./modules/renderer"
import { Finder } from "./modules/finder"
import { Initializer } from "./modules/Initializer"


export class MusicPlayer {
  finder: Finder
  renderer: Renderer
  initializer: Initializer
  message: Message

  player: Player | null = null
  audioPlayer = createAudioPlayer()

  init = false


  constructor(message: Message) {
    this.message = message

    this.renderer = new Renderer(
      message,
      this.audioPlayer
    )

    this.finder = new Finder(message)
    this.initializer = new Initializer(message)
  }


  async createPlayer(url: string) {
    const channel = this.message.member?.voice.channel

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


    const ytDlp = spawn(
      "yt-dlp",
      [
        "--cookies-from-browser",
        "chrome",

        "--js-runtimes",
        "node",

        "--remote-components",
        "ejs:github",

        "-f",
        "bestaudio",

        "-o",
        "-",

        url
      ],
      {
        stdio: [
          "ignore",
          "pipe",
          "inherit"
        ]
      }
    )


    const resource = createAudioResource(
      ytDlp.stdout,
      {
        inputType: StreamType.Arbitrary
      }
    )


    connection.subscribe(this.audioPlayer)

    this.audioPlayer.play(resource)


    console.log("PLAYING:", url)

    return this.audioPlayer
  }


  async musicRun() {
    const channel = this.message.member?.voice.channel

    
    if (!channel) {
      await this.message.reply(replies.joinVoice)
      return
    }


    if (!this.player) {
      await this.initializer.initPlayer()
    }


    const query = this.message.content
      .replace(/^music\s*/i, "")
      .trim()


    if (!query) {
      await this.message.reply(replies.enterSong)
      return
    }


    try {
      const songData =
        await this.finder.findMusic(query)

      const url = songData?.url
      const title = songData?.title


      if (!url || !title) {
        await this.message.reply(replies.notFound)
        return
      }


      const result =
        await this.createPlayer(url)


      if (!result) {
        await this.message.reply(replies.joinVoice)
        return
      }


      await this.renderer.renderPlayer(title)

    } catch (error) {
      console.error("MUSIC ERROR:", error)

      await this.message.reply(
        replies.musicError
      )
    }
  }
}