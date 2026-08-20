import { Message } from "discord.js"
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from "discord.js"
import { YouTubeVideo } from "play-dl"

export class Renderer {
  message: Message

  
  constructor(message: Message) {
    this.message = message
  }


  async renderPlayer(songData: YouTubeVideo[] | null) {

    if (!songData) return
    if (!this.message.channel.isSendable()) return


    const currentSong = songData[0]
    const currentUrl = currentSong.url
    const currentTitle = currentSong.title


    const pauseButton = new ButtonBuilder()
      .setCustomId("PAUSE")
      .setLabel("⏯")
      .setStyle(ButtonStyle.Secondary)

    const stopButton = new ButtonBuilder()
      .setCustomId("STOP")
      .setLabel("⏹")
      .setStyle(ButtonStyle.Danger)


    const buttonRow = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        pauseButton,
        stopButton
      )

    const songRow = new ActionRowBuilder<ButtonBuilder>()
    const songs = new Map<string, YouTubeVideo>()


    for (let i = 1; i < songData.length && i <= 5; i++) {
      const song = songData[i]
      const id = `SONG_${i}`

      const button = new ButtonBuilder()
        .setCustomId(`SONG_${i}`)
        .setLabel(song.title?.slice(0, 80) || "ERR")
        .setStyle(ButtonStyle.Secondary)

      songRow.addComponents(button)
      songs.set(id, song)    
    }
    

    const playerMessage = {
      content: `▶ ${currentTitle}`,
      components: [buttonRow, songRow]
    }
    
    // const collector = playerMessage.createMessageComponentCollector()
    return playerMessage

    // const playerMessage = await this.message.channel.send({
    //   content: `▶ ${currentTitle}`,
    //   components: [buttonRow, songRow]
    // })
    
    // const collector = playerMessage.createMessageComponentCollector()
    //   collector.on("collect", async (interaction) => {
    //   if (!interaction.isButton()) return

    //   const song = songs.get(interaction.customId)

      // if (song) {

      //   const stream = await play.stream(song.url)
      //   const resource = createAudioResource(stream.stream, { inputType: stream.type })

      //   this.player.play(resource)
      // }

      // await interaction.deferUpdate()
      // })
  }





    // let playerMessage = await this.message.channel


    // collector.on("collect", async (interaction) => {
    //   if (!interaction.isButton()) return


    //   if (interaction.customId === "PAUSE") {
    //     if (this.playNow) {
    //       this.player.pause()
    //       this.playNow = false

    //     } else {
    //       this.player.unpause()
    //       this.playNow = true
    //     }
    //   }


    //   if (interaction.customId === "STOP") {
    //     this.player.stop()
    //   }


      // await interaction.deferUpdate()
    // })
  // }
}