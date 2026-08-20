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
import { Initializer } from "./modules/initializer"
import { Buttoner } from "./modules/buttoner"
import { AudioPlayer } from "discord-player"

export class MusicPlayer {
  message: Message
  // audioPlayer : AudioPlayer
  memory: Array<Message>
  playerMessage : Message<boolean> | undefined

  initializer: Initializer
  finder: Finder
  renderer: Renderer
  buttoner: Buttoner

  constructor(message: Message) {
    this.message = message
    this.memory = []

    this.finder = new Finder(message)
    this.renderer = new Renderer(message)
    this.initializer = new Initializer(message)

    // this.audioPlayer = this.initializer.getAudioPlayer()
    this.buttoner = new Buttoner(this.initializer.audioPlayer)
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
    // const audioPlayer =
    //   this.initializer.getAudioPlayer()


    connection.subscribe(this.initializer.audioPlayer)

    this.initializer.audioPlayer.play(resource)

    return this.initializer.audioPlayer
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

      // const playerMessage = await this.message.channel
      // render
      try {
        const rendered  = await this.renderer.renderPlayer(songs)

        if (!this.message.channel.isSendable()) return
        if (!rendered) return
        
        this.playerMessage = await this.message.channel.send(rendered)

        if (this.playerMessage) {
        this.buttoner.handle(this.playerMessage)
        }

      } catch (error) {
        console.error(
          "RENDER ERROR:",
          error
        )

        await this.message.reply(
          replies.renderError
        )
      } 
      
      
      // buttons


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