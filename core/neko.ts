import { DiscordAdapter } from "../adapters/discord/discord"

import { MusicCommand } from "../modules/music/music-comand"
import { commands } from "../modules"
import test from "node:test"

export class Neko {
  discord: DiscordAdapter
  music: MusicCommand

  constructor() {
    this.discord = new DiscordAdapter()
    this.music = new MusicCommand()
  }


  start() {
    this.discord.onMessage(
      async message => {
        const text = message.content.trim()

        const commandName = text.split(" ")[0]
        const command = commands[ commandName as keyof typeof commands ]


        if (command) {
          const module = new command
          await module.run(message)
        }
      }
    )


    this.discord.start()
  }
}


new Neko().start()