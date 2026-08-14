import * as commands from "./ds-commands";
import "dotenv/config"


import {
  Client,
  GatewayIntentBits,
  VoiceBasedChannel
} from "discord.js"

import {
  joinVoiceChannel,
  VoiceConnection
} from "@discordjs/voice"


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildExpressions,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ]
})



client.on("messageCreate", async (message) => {
  if (message.author.bot) return

  const text = message.content.trim()
  const textArray = text.split(" ")

  const command = commands[textArray[0] as keyof typeof commands]
  const args = textArray.slice(1)

  if (!command) return

  command.run(message)
  message.reply(`Command ${text} executed!`)
})

client.once("clientReady", () => {
  console.log(`Discord bot active: ${client.user?.tag}`)
})

client.login(process.env.DISCORD_TOKEN)
