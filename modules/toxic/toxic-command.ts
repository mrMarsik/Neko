import { Message } from "discord.js"


import { DiscordChat } from "../../adapters/discord/chat"
import { DiscordVoice } from "../../adapters/discord/voice"


import { AngryNeko } from "./toxic"


export class ToxicCommand {

  chat: DiscordChat
  voice: DiscordVoice

  toxic: AngryNeko

  constructor() {
    this.chat = new DiscordChat()
    this.voice = new DiscordVoice()
    this.toxic = new AngryNeko()
  }
  
  
  async run(message: Message) {
    
    
    await this.chat.send(
      message,
      this.toxic.FuckYou()
    )

  }
}