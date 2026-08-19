import { Message } from "discord.js"
import play from "play-dl"

export class Finder {
  message: Message


  constructor(message: Message) {
    this.message = message
  }

   async findMusic(query: string) {
    const results = await play.search(query, {
      limit: 10
    })
    
    if (!results.length) {
      return null
}
    const trackArr = results

    if (!trackArr) {
      return null
    }

    console.log("FOUND:", trackArr[0].title)
    console.log("URL:", trackArr[0].url)

    if (this.message.channel.isSendable()) {
        await this.message.channel.send(
          trackArr[0].url
        )
      }

    return trackArr
  }
}