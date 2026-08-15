import { AudioPlayer } from "@discordjs/voice"
import { Message } from "discord.js"
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from "discord.js"


export class Renderer {
  message: Message
  player: AudioPlayer
  playNow: boolean

  constructor(message: Message, player: AudioPlayer) {
    this.message = message
    this.player = player
    this.playNow = true
  }


  async renderPlayer(title: string | undefined) {
    if (!title) return
    if (!this.message.channel.isSendable()) return


    const pauseButton = new ButtonBuilder()
      .setCustomId("PAUSE")
      .setLabel("⏯")
      .setStyle(ButtonStyle.Secondary)

    const stopButton = new ButtonBuilder()
      .setCustomId("STOP")
      .setLabel("⏹")
      .setStyle(ButtonStyle.Danger)


    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        pauseButton,
        stopButton
      )


    const playerMessage = await this.message.channel.send({
      content: `▶ ${title}`,
      components: [row]
    })


    const collector =
      playerMessage.createMessageComponentCollector()


    collector.on("collect", async (interaction) => {
      if (!interaction.isButton()) return


      if (interaction.customId === "PAUSE") {
        if (this.playNow) {
          this.player.pause()
          this.playNow = false

        } else {
          this.player.unpause()
          this.playNow = true
        }
      }


      if (interaction.customId === "STOP") {
        this.player.stop()
      }


      await interaction.deferUpdate()
    })
  }
}