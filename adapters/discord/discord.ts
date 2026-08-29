import "dotenv/config"

import {
  Client,
  Events,
  GatewayIntentBits,
  Message
} from "discord.js"


export type DiscordMessageHandler =
  (message: Message) =>
    void | Promise<void>


export class DiscordAdapter {
  client: Client

  private messageHandler?:
    DiscordMessageHandler


  constructor() {
    this.client =
      new Client({
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
          GatewayIntentBits.GuildVoiceStates
        ]
      })
  }


  onMessage(
    handler: DiscordMessageHandler
  ) {
    this.messageHandler = handler
  }


  start() {
    this.client.on(
      Events.MessageCreate,
      async message => {

        if (message.author.bot) {
          return
        }


        await this.messageHandler?.(
          message
        )
      }
    )


    this.client.once(
      Events.ClientReady,
      client => {

        console.log(
          `Discord active: ${client.user.tag}`
        )
      }
    )


    this.client.login(
      process.env.DISCORD_TOKEN
    )
  }
}