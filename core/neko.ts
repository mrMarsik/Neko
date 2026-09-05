import { DiscordAdapter } from "../adapters/discord/discord"

import { ToxicCommand } from "../modules/toxic/toxic-command"
import { MusicCommand } from "../modules/music/music-command"
import { commands } from "../modules"
import test from "node:test"

export class Neko {
  discord: DiscordAdapter
  music: MusicCommand
  toxic: ToxicCommand

  constructor() {
    this.discord = new DiscordAdapter()
    this.music = new MusicCommand()
    this.toxic = new ToxicCommand()
  }


  start() {
    this.discord.onMessage(
      async message => {
        console.log(message)
        const text = message.content.trim()

        const commandName = text.split(" ")[0].toLowerCase()
        const command = commands[ commandName as keyof typeof commands ]


        if (command) {
          if (command.config.adapters.includes('discord')) {

            const module = new command.module
            await module.run(message)

          }
        }
        
        this.toxic.run(message)
      }
    )


    this.discord.start()
  }
}


new Neko().start()