// import * as commands from "../ds-commands";
// import "dotenv/config"

// import {S
//   Client,
//   GatewayIntentBits,
//   VoiceBasedChannel
// } from "discord.js"

// import {
//   joinVoiceChannel,
//   VoiceConnection
// } from "@discordjs/voice"


// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMembers,
//     GatewayIntentBits.GuildModeration,
//     GatewayIntentBits.GuildExpressions,
//     GatewayIntentBits.GuildIntegrations,
//     GatewayIntentBits.GuildWebhooks,
//     GatewayIntentBits.GuildInvites,
//     GatewayIntentBits.GuildVoiceStates,
//     GatewayIntentBits.GuildPresences,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.GuildMessageReactions,
//     GatewayIntentBits.GuildMessageTyping,
//     GatewayIntentBits.DirectMessages,
//     GatewayIntentBits.DirectMessageReactions,
//     GatewayIntentBits.DirectMessageTyping,
//     GatewayIntentBits.MessageContent,
//   ]
// })



// client.on("messageCreate", async (message) => {
//   if (message.author.bot) return

//   const text = message.content.trim()
//   const command = commands[text as keyof typeof commands]

//   if (!command) return

//   command.run()
// })

