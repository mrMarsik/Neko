import {
  AudioPlayer,
  AudioPlayerStatus
} from "@discordjs/voice"

import {
  Message as DiscordMessage
} from "discord.js"


export class Buttoner {
  player: AudioPlayer


  constructor(player: AudioPlayer) {
    this.player = player
  }


  async handle(playerMessage: DiscordMessage) {
    const collector =
      playerMessage.createMessageComponentCollector()


    collector.on("collect", async (interaction) => {
      if (!interaction.isButton()) return


      if (interaction.customId === "PAUSE") {
        this.pause()
      }


      if (interaction.customId === "STOP") {
        this.stop()
      }


      await interaction.deferUpdate()
    })
  }


  pause() {
    if (this.player.state.status === AudioPlayerStatus.Paused) {
      this.player.unpause()
      return
    }

    this.player.pause()
  }


  stop() {
    this.player.stop()
  }


  next() {
    // потім
  }
}