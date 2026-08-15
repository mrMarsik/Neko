import { Message } from "discord.js"
import { Player } from "discord-player"
import { YouTubeDlpExtractor } from "discord-player-youtubedlp"



export class Initializer {
  

  message: Message
  player: Player
 

  constructor(message: Message) {
    this.message = message
    this.player = new Player(this.message.client)
  }
  

  async initPlayer() {

    this.player.events.on("error", (queue, error) => {
      console.error("QUEUE ERROR:", error)
    })

    this.player.events.on("playerError", (queue, error) => {
      console.error("PLAYER ERROR:", error)
    })
    await this.player.extractors.register(
      YouTubeDlpExtractor,
      {
        agent: {
          cookiesFromBrowser: "chrome"
        }
      }
    )
    return this.player
  }
}