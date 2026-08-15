import { Message } from "discord.js"
import play from "play-dl"

export class Finder {
  message: Message


  constructor(message: Message) {
    this.message = message
  }

   async findMusic(query: string) {
    const results = await play.search(query, {
      limit: 1
    })

    const track = results[0]

    if (!track) {
      return null
    }

    console.log("FOUND:", track.title)
    console.log("URL:", track.url)

    if (this.message.channel.isSendable()) {
        await this.message.channel.send(
          track.url
        )
      }

    return track
  }
}