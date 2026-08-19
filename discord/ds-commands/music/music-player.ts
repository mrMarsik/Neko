import { Message } from "discord.js"
import { spawn } from "node:child_process"

import {
  createAudioResource,
  StreamType,
  VoiceConnection
} from "@discordjs/voice"

import { music as replies } from "../../replies"

import { Renderer } from "./modules/renderer"
import { Finder } from "./modules/finder"
import { Initializer } from "./modules/Initializer"


export class MusicPlayer {
  message: Message

  finder: Finder
  renderer: Renderer
  initializer: Initializer


  constructor(message: Message) {
    this.message = message

    this.finder = new Finder(message)
    this.renderer = new Renderer(message)
    this.initializer = new Initializer(message)
  }


  createResource(url: string) {
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


    return createAudioResource(
      ytDlp.stdout,
      {
        inputType: StreamType.Arbitrary
      }
    )
  }


  play(
    resource: ReturnType<typeof createAudioResource>,
    connection: VoiceConnection
  ) {
    const audioPlayer =
      this.initializer.getAudioPlayer()


    connection.subscribe(audioPlayer)

    audioPlayer.play(resource)

    return audioPlayer
  }


  async musicRun() {
    const query = this.message.content.slice(1)


    if (!query) {
      await this.message.reply(
        replies.enterSong
      )

      return
    }


    try {

      // init
      const connection = await this.initializer.connectVoice()

      if (!connection) {
        await this.message.reply(
          replies.joinVoice
        )

        return
      }


      // find
      const songs = await this.finder.findMusic(query)
      const firstSong = songs?.[0]

      if (!firstSong?.url || !firstSong?.title) {
        await this.message.reply(
          replies.notFound
        )

        return
      }


      // play
      const resource = this.createResource(firstSong.url)
      this.play(resource, connection)


      // render
      try {
        await this.renderer.renderPlayer(
          songs
        )
      } catch (error) {
        console.error(
          "RENDER ERROR:",
          error
        )

        await this.message.reply(
          replies.renderError
        )
      }


    } catch (error) {
      console.error(
        "MUSIC ERROR:",
        error
      )

      await this.message.reply(
        replies.musicError
      )
    }
  }
}