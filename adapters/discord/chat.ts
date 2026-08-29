import {
  Message,
  MessageCreateOptions
} from "discord.js"


export class DiscordChat {

  async reply(
    message: Message,
    content: string
  ) {
    return message.reply(content)
  }


  async send(
    message: Message,
    content:
      | string
      | MessageCreateOptions
  ) {
    if (
      !message.channel.isSendable()
    ) {
      return
    }


    return message.channel.send(
      content
    )
  }
}