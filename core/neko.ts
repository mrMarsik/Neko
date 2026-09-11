import { DiscordAdapter } from "../adapters/discord/discord"


import { MusicCommand } from "../modules/music/music-command"
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
        

      }
    )


    this.discord.start()
  }
}


new Neko().start()